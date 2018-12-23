'use strict'

const Referral = use('App/Models/Referral');
const Config = use('Config');

class ReferralsController {
  async index({
    view,
    auth
  }) {
    return view.render('app.referrals.index', {
     referrals: (await Referral.query().where({referred_by: auth.user.id}).with('user').fetch()).toJSON(),
     fullUrl: Config.get('app.fullUrl'),
    });
  }
}

module.exports = ReferralsController
