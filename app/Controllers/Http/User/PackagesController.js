'use strict'

const Hash = use('Hash');
const Config = use('Config');
const Deposit = use('App/Models/Deposit');
const User = use('App/Models/User');
const Transaction = use('App/Models/Transaction');
const Reference = use('App/Models/Reference');
const Plan = use('App/Models/Plan');
const Package = use('App/Models/Package');
const _ = require('lodash');
const moment = require('moment');
const https = require('https');

const {
  validateAll
} = use('Validator');
const validationMessages = use('App/Helpers/ValidationMessages');

class PackagesController {
  async index({
    auth,
    view
  }) {
    console.log((await Package.query().where({
      user_id: auth.user.id
    }).with('plan')
    .withCount('payments', (builder) => {
      builder.where('status', 1)
    }).fetch()).toJSON());

    return view.render('app.packages.index', {
      packages: (await Package.query().where({
            user_id: auth.user.id
          }).with('plan')
          .withCount('payments', (builder) => {
            builder.where('status', 1)
          }).fetch())
        .toJSON()
    });
  }

  async show({
    params,
    view
  }) {
    return view.render('app.packages.show', {
      investment: (await Investment.query().where({
        id: params.id
      }).first()).toJSON()
    });
  }

  async choose({
    view,
    auth,
    session,
    response
  }) {

    if ((await Package.query().where({
        user_id: auth.user.id,
        status: "1"
      }).count('* as count'))[0].count == 1) {
      session.flash({
        error: 'Sorry But you can only run one package at a time'
      });
      return response.redirect('back')
    }
    return view.render('app.packages.choose', {
      plans: (await Plan.query().fetch()).toJSON(),
    });
  }

  async paymentNotify({
    request,
    session,
    response,
    auth
  }) {

    const {
      reference
    } = request.all();

    const paystackOptions = {
      hostname: "api.paystack.co",
      port: 443,
      path: "/transaction/verify/" + encodeURIComponent(reference),
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'cache-control': 'no-cache',
        'authorization': 'Bearer ' + Config.get('paystack.secret')
      },
    };

    const paystackRes = await new Promise((resolve, reject) => {
      const req = https.request(paystackOptions, (res) => {
        let resData = '';
        res.setEncoding('utf8');
        res.on('data', (chunk) => {
          resData += chunk;
        });
        res.on('end', () => {
          const jsonData = JSON.parse(resData);
          if (jsonData.status === 400) {
            return reject(new Error(jsonData.message));
          }
          return resolve(jsonData);
        });
      });

      req.on('error', e => reject(e));

      req.write('');
      req.end();
    });

    if (!paystackRes['status']) {

      session.flash({
        info: 'Error occured while processing your request.'
      });

      response.route('app.packages.choose')
    }

    if ('success' == paystackRes['data']['status']) {

      console.log(paystackRes['data']);

      // TODO
      let {
        reference,
        amount
      } = paystackRes['data']

      const email = paystackRes['data']['customer']['email']

      amount = amount / 100;

      const authUser = await User.query().where({
        email
      }).first()

      const _package = await Package.create({
        user_id: authUser.id,
        plan_id: session.pull('plan_id'),
        status: 1
      });

      Deposit.create({
        user_id: authUser.id,
        package_id: _package.id,
        platform: 'PAYSTACK',
        status: '1',
        approved: moment().format("YYYY-MM-DD HH:mm:ss"),
        amount,
        reference,
      });

      Transaction.create({
        user_id: authUser.id,
        message: "Bought Package Through Online Payment",
        from: "online_deposit",
        amount,
        from_id: _package.id,
        type: 1
      });

      session.flash({
        info: 'Package Bought Successfully.'
      });

      response.route('app.packages.index')

    }

  }

  async store({
    request,
    response,
    session,
    auth
  }) {

    if ((await Package.query().where({
        user_id: auth.user.id,
        status: "1"
      }).count('* as count'))[0].count == 1) {
      session.flash({
        error: 'Sorry But you can only run one package at a time'
      });
      return response.redirect('back')
    }

    const validationRules = {
      plan_id: 'required',
      method: 'required',
    };

    const validation = await validateAll(request.all(), validationRules, validationMessages);

    if (validation.fails()) {
      session
        .withErrors(validation.messages())
      return response.redirect('back')
    }

    const {
      plan_id,
      method
    } = request.all()

    session.put('plan_id', plan_id)

    const plan = await Plan.query().where({
      id: plan_id
    }).first()

    const email = auth.user.email;
    const amount = plan.capital * 100;

    if (method == 'Paystack') {

      const paystackOptions = {
        hostname: "api.paystack.co",
        port: 443,
        path: "/transaction/initialize",
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'cache-control': 'no-cache',
          'authorization': 'Bearer ' + Config.get('paystack.secret')
        },
      };

      const paystackRes = await new Promise((resolve, reject) => {
        const req = https.request(paystackOptions, (res) => {
          let resData = '';
          res.setEncoding('utf8');
          res.on('data', (chunk) => {
            resData += chunk;
          });
          res.on('end', () => {
            console.log(resData);
            const jsonData = JSON.parse(resData);
            if (jsonData.status === 400) {
              return reject(new Error(jsonData.message));
            }
            return resolve(jsonData);
          });
        });

        req.on('error', e => reject(e));

        const postData = JSON.stringify({
          amount,
          email,
        });
        console.log(postData);
        req.write(postData);
        req.end();
      });

      return response.redirect(paystackRes['data']['authorization_url']);

    }

    // if it is deposit
    Package.create({
      user_id: auth.user.id,
      plan_id: request.input('plan_id'),
    });

    // Redirect to the payment details page

    session.flash({
      info: 'Package Successfully Created'
    });

    return response.route('app.packages.index');
  }

}



module.exports = PackagesController
