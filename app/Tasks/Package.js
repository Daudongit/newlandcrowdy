const Task = use('Task');
const Payment = use('App/Models/Payment');
const Transaction = use('App/Models/Transaction');
const Package = use('App/Models/Package');
const dateFormat = require('dateformat');
const User = use('App/Models/User');
const moment = require('moment');

class PackageTask extends Task {
  static get schedule() {
    return '0 0 * * *';
  }

  async handle() {
    try {
      const packages = (
        await Package.query()
          .where({
            status: 1,
          })
          .with('plan')
          .fetch()
      ).toJSON();

      const date = dateFormat(null, 'yyyy-mm-dd');
      const fullNow = dateFormat(null, 'yyyy-mm-dd HH:MM:ss');
      packages.forEach(async _package => {
        var now = moment(date);
        const last_process = _package.last_process ? _package.last_process : _package.started;
        var end = moment(last_process);
        var duration = moment.duration(now.diff(end));
        var daysSinceLastProcess = Math.floor(duration.asDays());
        if (daysSinceLastProcess > 30) {
          const amount = Math.ceil((_package.plan.interest * _package.plan.capital) / 100);
          User.query()
            .where({
              id: _package.user_id,
            })
            .increment('wallet', amount)
            .then(() => {});

          Payment.create({
            user_id: _package.user_id,
            package_id: _package.id,
            amount,
            status: 1,
            created_at: fullNow,
          }).then(() => {});

          Transaction.create({
            user_id: _package.user_id,
            amount: amount,
            message: 'Package Payment',
            type: Transaction.credit(),
            from: 'package_payout',
            from_id: _package.id,
          }).then(() => {});

          Package.query()
            .where({
              id: _package.id,
            })
            .update({
              last_process: date,
            })
            .then(() => {});

          const paymentsCount = (
            await Payment.query()
              .where({
                package_id: _package.id,
              })
              .count('* as count')
          )[0].count;
          if (paymentsCount === 12) {
            Package.query()
              .where({
                id: _package.id,
              })
              .update({
                last_process: date,
                status: 2,
              })
              .then(() => {});
          }
        }
      });
    } catch (e) {
      console.log(e);
    }
  }
}

module.exports = PackageTask;
