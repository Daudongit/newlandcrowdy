'use strict'
const _ = require('lodash');

const Model = use('Model')
const Mail = use("Mail");
const Config = use("Config");
const User = use('App/Models/User');

class Transaction extends Model {

  static boot () {
    super.boot()

    /**
    * A hook to hash the user password before saving
    * it to the database.
    */
    this.addHook('beforeCreate', async (txnInstance) => {
      console.log(txnInstance.user_id);

      const user = await User.query().where({id: txnInstance.user_id}).first()

      Mail.send('emails.transactions', {
        user:  `${user.last_name} ${user.first_name}`,
        type : txnInstance.type === Transaction.debit() ? 'Debit' : 'Credit',
        amount: txnInstance.amount,
        message: txnInstance.message
        }
      , (message) => {
          message
          .to(Config.get('mail.transaction'))
          .from(Config.get('mail.from.email'), Config.get('mail.from.name'))
          .subject(Config.get('app.name') + ' - Transactions')
      }).then(() => {})


    })

    // {
    //   user_id: user.id,
    //   message: "Bought Package Through Bank Deposit",
    //   from: "bank_deposit",
    //   amount: deposit.amount,
    //   from_id: deposit.package_id,
    //   type: Transaction.debit()
    // }

  }

  static get computed() {
    return ['fullType', 'fullFrom']
  }

  static debit(){
    return 0
  }

  static credit(){
    return 1
  }

  static getEnums() {
    return [
      {
        field: 'type',
        id: 0,
        label: "Debit",
        class: 'danger',
      },
      {
        field: 'type',
        id: 1,
        label: "Credit",
        class: 'success',
      }
    ]
  }

  getFullFrom({
    from
  }) {
    return from.toUpperCase().replace('_', " ");
  }

  getFullType({
    type
  }) {
      return _.find(Transaction.getEnums(), {field: 'type', id: type})
  }

  user() {
    return this.belongsTo('App/Models/User')
  }

}

module.exports = Transaction


//ONLINE_PAYMENT