'use strict'
const _ = require('lodash');

const Model = use('Model')

class Transaction extends Model {
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