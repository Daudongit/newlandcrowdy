'use strict'

const Task = use('Task')
const Payment = use('App/Models/Payment');
const Transaction = use('App/Models/Transaction');
const dateFormat = require('dateformat');
const User = use('App/Models/User');
const moment = require('moment');

class InvestmentTask extends Task {
  static get schedule () {
    return '0 * * */1 * *'
  }

  async handle () {
    
    // const investments = await Investment.query().where({
    //   status: 1
    // }).get();
    
    // const date = dateFormat(null, "yyyy-mm-dd");

    // investments.forEach(investment => {

    //   var now = moment(date); //todays date
    //   var end = moment(investment.last_process); // another date
    //   var duration = moment.duration(now.diff(end));
    //   var paymentsToMake = duration.asDays();

    //   if (paymentsToMake > 0) {

    //     let next_interest_days_count = investment.next_interest_days_count + paymentsToMake;

    //     if (next_interest_days_count >= investment.interest_duration) {

    //        next_interest_days_count = next_interest_days_count - investment.interest_duration;

    //       const amount = Math.ceil(investment.rate * investment.amount / 100);

    //     //   for (let i = 0; i < paymentsToMake; i++) {

    //         User.query().where({
    //           id: investment.user_id
    //         }).increment('wallet', amount).then(() => {});

    //         Payment.create({
    //           user_id: investment.user_id,
    //           investment_id: investment.id,
    //           amount,
    //           count: 1,
    //         });

    //         Transaction.create({
    //           user_id: investment.user_id,
    //           amount: amount,
    //           message: "Investment Payment",
    //           type: "0",
    //           from: 'investment_payout',
    //           from_id: investment.id
    //         }).then(() => {})
    //       }

    //     // }

    //     Investment.query().where({
    //       id: investment.id
    //     }).update({
    //       next_interest_days_count,
    //       last_process: date
    //     }).then(() => {});

    //   }

    // });
    // this.info('Task Investment handle')
  }
}

module.exports = InvestmentTask
