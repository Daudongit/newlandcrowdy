'use strict'

const {
  validateAll
} = use('Validator');
const validationMessages = use('App/Helpers/ValidationMessages');
const Route = use("Route");
const Mail = use("Mail");
const Config = use('Config');
const Hash = use('Hash');
const User = use('App/Models/User');
const Token = use('App/Models/Token');
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
      referral
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


    const activationCode = randomstring.generate();

    await User.create({
      email,
      password,
      username,
      phone_number,
      last_name,
      first_name,
      verified: activationCode,
    });

    Mail.send('emails.activateaccount', {
      name: username,
      link: 'http://' + request.hostname() + Route.url('auth.activateAccount', {
        username,
        token: activationCode
      })
    }, (message) => {
      message
        .to(email)
        .from(Config.get('mail.from.email'), Config.get('mail.from.name'))
        .subject('Welcome to ' + Config.get('app.name'))
    }).then(() => {})

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
    }).then(() => {})

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
