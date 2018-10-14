'use strict'

const Config = use('Config');
const Route = use('Route');
// const Package = use('App/Models/Package');
const Transaction = use('App/Models/Transaction');
const Withdrawal = use('App/Models/Withdrawal');
const User = use('App/Models/User');


class HomeController {
  async getDashboard({
    view,
    auth,
    request
  }) {

    return view.render('app.dashboard', {

     sitename: Config.get('app.name'),

     user: (await User.query().where({
        id: auth.user.id
      }).first()).toJSON(),

      referralLink:  Config.get('app.fullUrl') + Route.url('auth.referral', {
        referral: auth.user.username
      }),

      // totalPackages: (await Package.query().where({
      //   user_id: auth.user.id
      // }).sum('amount as amount'))[0].amount,

      totalWithdrawals: (await Withdrawal.query().where({
        user_id: auth.user.id
      }).sum('amount as amount'))[0].amount,


      lastTransactions: (await Transaction.query().where({
        user_id: auth.user.id
      }).orderBy('id', 'desc').limit(5).fetch()).toJSON()

    });
  }
}

module.exports = HomeController
