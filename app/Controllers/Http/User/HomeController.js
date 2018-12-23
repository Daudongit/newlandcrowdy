'use strict'

const Config = use('Config');
const Route = use('Route');
const Transaction = use('App/Models/Transaction');
// const Package = use('App/Models/Package');
const Withdrawal = use('App/Models/Withdrawal');
const UserAnnouncement = use('App/Models/UserAnnouncement');
const User = use('App/Models/User');


class HomeController {
  async getDashboard({
    view,
    auth,
    request
  }) {

    return view.render('app.dashboard', {

     sitename: Config.get('app.name'),

     fullUrl: Config.get('app.fullUrl'),

     announcementCount: (await UserAnnouncement.query().where({
      user_id: auth.user.id,
      opened: 0
    }).count('* as count'))[0].count,

     user: (await User.query().where({
        id: auth.user.id
      }).first()).toJSON(),

      totalInvested: (await Transaction.query().where({
        user_id: auth.user.id,
        type: Transaction.debit()
      }).sum('amount as amount'))[0].amount,

      totalWithdrawals: (await Withdrawal.query().where({
        user_id: auth.user.id
      }).sum('amount as amount'))[0].amount + 
      (await Withdrawal.query().where({
        user_id: auth.user.id
      }).sum('charge as charge'))[0].charge,


      lastTransactions: (await Transaction.query().where({
        user_id: auth.user.id
      }).orderBy('id', 'desc').limit(5).fetch()).toJSON()

    });
  }
}

module.exports = HomeController
