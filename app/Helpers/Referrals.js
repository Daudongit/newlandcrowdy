const Reference = use('App/Models/Reference');
const User = use('App/Models/User');
const Transaction = use('App/Models/Transaction');
const Referral = use('App/Models/Referral');

class Referrals {
  async credit(user_id, amount) {
    const userReferral = await Referral.query()
      .where({
        user_id: user_id,
      })
      .first();

    if (userReferral && userReferral.status == 0) {
      const referralsPercentage = (
        await Reference.query()
          .where('slug', 'referrals_percent')
          .first()
      ).value;

      const amountForReferrals = (amount * referralsPercentage) / 100;

      Transaction.create({
        user_id: userReferral.referred_by,
        message: 'Referrals Bonus',
        from: 'referrals',
        amount: amountForReferrals,
        type: Transaction.credit(),
      });

      User.query()
        .where({
          id: userReferral.referred_by,
        })
        .increment('wallet', amountForReferrals)
        .then(() => {});

      Referral.query()
        .where({
          id: userReferral.id,
        })
        .update({
          amount: amountForReferrals,
          status: 1,
        })
        .then(() => {});
    }

    return true;
  }
}

module.exports = Referrals;
