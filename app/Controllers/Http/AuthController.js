'use strict'

const {
  validateAll
} = use('Validator');
const validationMessages = use('App/Helpers/ValidationMessages');
const Route = use("Route");
const Mail = use("Mail");
const Helpers = use('Helpers');
const Config = use('Config');
const Hash = use('Hash');
const uuidv4 = require('uuid/v4');
const User = use('App/Models/User');
const Token = use('App/Models/Token');
const BankDetail = use('App/Models/BankDetail');
const randomstring = require('randomstring');
const moment = require("moment");

class AuthController {

  getSignUp({
    view,
    params
  }) {
    return view.render('auth.signup', {
      referral: params.referral
    });
  }

  getForGotPassword({
    view
  }) {
    return view.render('auth.forgotpassword');
  }

  async doSignUp({
    request,
    response,
    session
  }) {
    const validation = await validateAll(request.all(), {
        email: 'required|email|unique:users,email',
        username: 'required|unique:users,username',
        phone_number: 'required|unique:users,phone_number',
        last_name: 'required',
        first_name: 'required',
        password: 'required',
        address: 'required',
        city: 'required',
        state: 'required',
        bank_name: 'required',
        account_name: 'required',
        account_number: 'required'
      },
      validationMessages
    );
    if (validation.fails()) {
      session
        .withErrors(validation.messages())
        .flashExcept(['password'])

      return response.redirect('back')
    }
    const {
      email,
      password,
      username,
      first_name,
      last_name,
      phone_number,
      bank_name,
      account_number,
      account_name,
      address,
      city,
      state,
    } = request.all();

    // let referred_by = 0;

    // if (referral) {
    //   const referralUser = await User.query().where('username', request.input('referral')).first();

    //   if (!referralUser) {
    //     session.flash({
    //       error: 'Referral Doesn\'t exist.'
    //     }).flashExcept()
    //     return response.redirect('back');
    //   }

    //   referred_by = referralUser.id

    //   emailMessage = emailMessage
    //     .replace('{{first_name}}', first_name)
    //     .replace('{{last_name}}', last_name)
    //     .replace('{{phone_number}}', phone_number)
    //     .replace('{{email}}', email)
    //     .replace('{{username}}', username)

    //   Mail.send('emails.referral_notify', {
    //     name: referralUser.getFullName(),
    //     message: emailMessage.replace(/(?:\r\n|\r|\n)/g, '<br>')
    //   }, (message) => {
    //     message
    //       .to(referralUser.email)
    //       .from(Config.get('mail.from.email'), Config.get('mail.from.name'))
    //       .subject('Referral Registration - ' + Config.get('app.name'))
    //   }).then(() => {})
    // }

    // emailMessage = emailMessage
    //   .replace('{{first_name}}', first_name)
    //   .replace('{{last_name}}', last_name)
    //   .replace('{{phone_number}}', phone_number)
    //   .replace('{{email}}', email)
    //   .replace('{{username}}', username)

    const id_card = request.file('id_card')
    const picture = request.file('picture')


    if (picture.size == 0 || id_card.size == 0) {
      session.flashExcept(['password']).flash({
        error: "Both the picture and ID Card are required",
      });
      return response.redirect('back');
    }

    if (id_card.type != 'image' && picture.type != 'image') {
      session.flashExcept(['password']).flash({
        error: "Only Images Are Allowed",
      });
      return response.redirect('back');
    }

    if (picture.size > 1000000 || id_card.size > 1000000) {
      session.flashExcept(['password']).flash({
        error: "Image size too large. Maximum size is 1MB",
      });
      return response.redirect('back');
    }

    const picture_ = 'uploads/picture/' + uuidv4() + '.jpg';
    const id_card_ = 'uploads/id_card/' + uuidv4() + '.jpg';

    await picture.move(Helpers.publicPath(), {
      name: picture_
    })

    await id_card.move(Helpers.publicPath(), {
      name: id_card_
    })

    if (!id_card.moved()) {
      return id_card.error()
    }

    if (!picture.moved()) {
      return picture.error()
    }

    const activationCode = randomstring.generate();

    const user = await User.create({
      email,
      password,
      username,
      phone_number,
      last_name,
      first_name,
      verified: activationCode,
      address,
      city,
      state,
      picture: picture_,
      id_card: id_card_,
    });

    BankDetail.create({
       user_id: user.id,
       bank_name,
       account_number,
       account_name
    }).then(() => {});

    Mail.send('emails.activateaccount', {
      name: username,
      link: Config.get('app.fullUrl') + Route.url('auth.activateAccount', {
        username,
        token: activationCode
      })
    }, (message) => {
      message
        .to(email)
        .from(Config.get('mail.from.email'), Config.get('mail.from.name'))
        .subject('Welcome to ' + Config.get('app.name'))
    }).then(() => {
      console.log("nic3")
    }).catch(e => {
      console.log(e)
    })

    session.flash({
      info: 'We just sent you a mail, please check and confirm your email to login.'
    })
    return response.redirect('back');

  }

  async doForGotPassword({
    request,
    response,
    session
  }) {
    const validation = await validateAll(request.all(), {
      email: 'required|email',
    }, validationMessages);

    if (validation.fails()) {
      session
        .withErrors(validation.messages())
        .flashExcept()
      return response.redirect('back')
    }
    const email = request.input('email');

    const responseMessage = "We just sent you a mail containing your new password if the email you sent was valid.";

    const user = await User.query().where({
      email
    }).first();
    if (!user) {
      session.flash({
        error: responseMessage
      }).flashExcept()
      return response.redirect('back');
    }

    const newPassword = randomstring.generate();

    User.query().where({
      id: user.id
    }).update({
      password: await Hash.make(newPassword)
    }).then(() => {})

    Mail.send('emails.changepassword', {
      name: `${user.username}`,
      newPassword
    }, (message) => {
      message
        .to(email)
        .from(Config.get('mail.from.email'), Config.get('mail.from.name'))
        .subject('Password Reset - ' + Config.get('app.name'))
    }).then((kiss) => {
      console.log('kiss')
    }).catch(hello => {
      console.log(hello)
    });

    session.flash({
      info: responseMessage
    });

    return response.redirect('back');

  }

  async activateAccount({
    response,
    session,
    params
  }) {

    const {
      username,
      token
    } = params;

    const user = await User.query().where({
      username
    }).first();
    if (!user) {
      session.flash({
        error: 'Username Doesn\'t exist.'
      });
      return response.route('app.signin');
    }

    if (!await Hash.verify(token, user.verified)) {
      session.flash({
        error: `Account Activation Failed`
      });
      return response.route('app.signin');
    }

    User.query().where({
      id: user.id
    }).update({
      verified: '1',
      // activated_at: moment().format("YYYY-MM-DD HH:mm:ss"),
    }).then(() => {})

    session.flash({
      info: 'Account activated successfully. Please Signin'
    })

    return response.route('app.signin');
  }


  getAdminSignin({
    view
  }) {
    return view.render('auth.signin', {
      authFrom: 'admin'
    });
  }

  getAppSignin({
    view
  }) {
    return view.render('auth.signin', {
      authFrom: 'app'
    });
  }

  async logOut({
    auth,
    response
  }) {
    await Token.query().where("user_id", auth.user.id).delete();
    await auth.logout()
    return response.route('index');
  }

  async postAdminSignin({
    auth,
    request,
    response,
    session
  }) {

    const validation = await validateAll(request.all(), {
      email: 'required|email',
      password: 'required',
    }, validationMessages);

    if (validation.fails()) {
      session
        .withErrors(validation.messages())
        .flashExcept(['password'])

      return response.redirect('back')
    }

    const user = await User.query().where('email', request.input('email')).first();

    if (!user) {
      session.flash({
        error: 'Invalid Login.'
      })
      return response.redirect('back');
    }

    if (!user.isAdmin()) {
      session.flash({
        error: 'Invalid Login.'
      })
      return response.redirect('back');
    }

    const {
      email,
      password
    } = request.all()

    try {
      await auth.remember(true).attempt(email, password);
    } catch (e) {
      session.flash({
        error: 'Invalid Login.'
      });
      return response.redirect('back');
    }

    if (session.get('fromURL')) {
      return response.redirect(session.pull('fromURL'))
    }
    return response.route('admin.dashboard')
  }


  async postAppSignin({
    auth,
    request,
    response,
    session
  }) {

    const validation = await validateAll(request.all(), {
      email: 'required|email',
      password: 'required',
    }, validationMessages);
    if (validation.fails()) {

      session
        .withErrors(validation.messages())
        .flashExcept(['password'])

      return response.redirect('back')
    }
    const user = await User.query().where('email', request.input('email')).first();

    if (!user) {
      session.flash({
        error: 'Invalid Login.'
      })
      return response.redirect('back');
    }

    if (!user.isUser()) {
      session.flash({
        error: 'Invalid Login.'
      })
      return response.redirect('back');
    }

    if (user.verified !== '1') {
      session.flash({
        error: 'Acccount Not Activated.'
      })
      return response.redirect('back');
    }

    const {
      email,
      password
    } = request.all()

    try {
      await auth.remember(true).attempt(email, password);
    } catch (e) {
      console.log(e)
      session.flash({
        error: 'Invalid Login3.'
      });
      return response.redirect('back');
    }

    if (session.get('fromURL')) {
      return response.redirect(session.pull('fromURL'))
    }

    return response.route('app.dashboard')

  }

}

module.exports = AuthController
