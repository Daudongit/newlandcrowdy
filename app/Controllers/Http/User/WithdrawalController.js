'use strict';

const Hash = use('Hash');
const User = use('App/Models/User');
const Transaction = use('App/Models/Transaction');
const Withdrawal = use('App/Models/Withdrawal');
const Reference = use('App/Models/Reference');
const _ = require('lodash');

const {
    validateAll
  } = use('Validator');
  const validationMessages = use('App/Helpers/ValidationMessages');

class WithdrawalController {

  constructor() {
    this.indexAbles = [{
        label: "Amount",
        value: "amount",
        type: "money"
      },
      {
        label: "Charge",
        value: "charge",
        type: "money"
      },
      {
        label: "Status",
        value: "fullStatus",
        type: 'label'
      },
      {
        label: "Submitted",
        value: "created_at",
        type: "date"
      },
    ];
  }

  async create({
      auth,
    view  }) {

    const formHeaders =  (await Reference.query().whereIn('slug',['min_withdrawal', 'max_withdrawal', 'withdrawal_charges']).get())
    
    formHeaders.push({
        title: "Wallet Balance",
        type: "money",
        value: auth.user.wallet
    })

    return view.render('app.withdrawals.create', {
        formHeaders
    });
  }

  async index({
    view,
    auth,
    request
  }) {

    const page = request.input('page') || 1;
    return view.render('crud.index', {
      mutipleItems: 'Withdrawals',
      singleItem: 'Withdrawal',
      resourceRoute: 'app.withdrawals',
      resourceData: (await Withdrawal.query().where({
        user_id: auth.user.id
      }).orderBy('id', 'desc').paginate(page)).toJSON(),
      indexAbles: this.indexAbles,
      hasCreate: true,
      noAction: true
    });
  }

  async store({
    request,
    response,
    session,
    auth
  }) {

    const validationRules = {
      amount: 'required',
      password: 'required',
    };

    const validation = await validateAll(request.all(), validationRules, validationMessages);

    if (validation.fails()) {
      session
        .withErrors(validation.messages())
      return response.redirect('back')
    }

    if (!await Hash.verify(request.input('password'), auth.user.password)) {
        session.flash({
          error: `Invalid Password.`
        });
        return response.redirect('back')
      }

    const amount = request.input('amount');

    if(amount > auth.user.wallet){
        session.flash({
            error: "Insufficient Balance"
        });
        return response.redirect('back');
    }

    const references =  (await Reference.query().whereIn('slug',['min_withdrawal', 'max_withdrawal', 'withdrawal_charges']).get())


    if(amount >  parseInt(_.find(references, {slug : 'max_withdrawal'}).value)) {
        session.flash({
            error: "Sorry! But you can't exceeded the maximum withdrawal limit"
        });
        return response.redirect('back');
    }


    if(amount < parseInt(_.find(references, {slug : 'min_withdrawal'}).value)){
        session.flash({
            error: "Sorry! But you need to go above the minimum withdrawal amount",
        });
        return response.redirect('back');
    }

    const charges = _.find(references, {slug : 'withdrawal_charges'}).value;

    User.query().where({
        id: auth.user.id
    }).update({
        wallet: auth.user.wallet - amount
    }).then(() => {})

    Transaction.create({
        user_id : auth.user.id,
        amount,
        message: "Withdrawal Request Submitted Successfully",
        type: "0",
        from: "withdrawal"
    }).then(() => {})

    Withdrawal.create({
      user_id: auth.user.id,
      charge: charges,
      amount: amount - charges
    }).then(() => {})

    session.flash({
      info: 'Withdrawal Request Successfully Submitted'
    });

    return response.route('app.withdrawals.index');
  }

}

module.exports = WithdrawalController
