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

      totalInvested: (await Transaction.query().where({
        user_id: auth.user.id,
        type: 0
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
