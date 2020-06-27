'use strict';

const Route = use('Route');
const Reference = use('App/Models/Reference');

class IsUser {
  async handle({ response, auth, request, session }, next) {
    if (!auth.user.isUser()) {
      return response.route('admin.dashboard');
    }

    if (request.url().indexOf('supports') === -1 && auth.user.suspended === 1) {
      session.flash({
        info: `YOUR ACCOUNT HAS BEEN SUSPENDED. KINDLY CONTACT US BELOW.`,
      });
      return response.route('app.support.create');
    }

    if (
      [Route.url('app.account.settings'), Route.url('app.account.profile')].indexOf(
        request.url(),
      ) === -1
    ) {
      if (!auth.user.first_name || !auth.user.last_name || !auth.user.phone_number) {
        session.flash({
          info: 'Please complete your profile to continue using the site.',
        });
        return response.route('app.account.settings');
      }
    }

    // if (
    //   [
    //     Route.url('app.account.settings'),
    //     Route.url('app.account.profile'),
    //     Route.url('app.wallet.voucher'),
    //     Route.url('app.wallet.index'),
    //   ].indexOf(request.url()) === -1 &&
    //   request.url().indexOf('deposits') === -1
    // ) {
    //   if (auth.user.active == 0) {
    //     const amount = (
    //       await Reference.query()
    //         .where('slug', 'activation_amount')
    //         .first()
    //     ).value;
    //     session.flash({
    //       info: `Please, Make a deposit equal or greater than ${amount} to activate your account.`,
    //     });
    //     return response.route('app.wallet.index');
    //   }
    // }

    await next();
  }
}

module.exports = IsUser;
