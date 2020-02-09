'use strict';

const Config = use('Config');
const Route = use('Route');
const Package = use('App/Models/Package');
const Transaction = use('App/Models/Transaction');
const Withdrawal = use('App/Models/Withdrawal');
const Support = use('App/Models/Support');
const User = use('App/Models/User');

class HomeController {
  async getDashboard({ view, auth, request }) {
    return view.render('admin.dashboard', {
      withdrawalsCount: (
        await Withdrawal.query()
          .where({
            status: 0,
          })
          .count('* as count')
      )[0].count,

      supportCount: (
        await Support.query()
          .where({
            status: 0,
          })
          .count('* as count')
      )[0].count,

      runningPackages: (
        await Package.query()
          .where({
            status: 1,
          })
          .count('* as count')
      )[0].count,

      allPackages: (
        await Package.query()
          .where('status', '>', 0)
          .count('* as count')
      )[0].count,

      userCount: (
        await User.query()
          .where({
            role: 0,
            verified: 1,
          })
          .count('* as count')
      )[0].count,

      walletBalance: (await User.query().sum('wallet as wallet'))[0].wallet,

      totalInvested: (
        await Transaction.query()
          .where({
            type: Transaction.debit(),
          })
          .sum('amount as amount')
      )[0].amount,

      totalWithdrawals:
        (
          await Withdrawal.query()
            .where({})
            .sum('amount as amount')
        )[0].amount +
        (
          await Withdrawal.query()
            .where({})
            .sum('charge as charge')
        )[0].charge,

      // totalPackages: (await Package.query().where({
      //   user_id: auth.user.id
      // }).sum('amount as amount'))[0].amount,
    });
  }
}

module.exports = HomeController;
