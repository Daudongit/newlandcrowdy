'use strict'
const _ = require('lodash');

const Model = use('Model')

class Withdrawal extends Model {

  static get computed() {
    return ['fullStatus']
  }

  static getEnums() {
    return [
      {
        field: 'status',
        id: 0,
        label: "UnProcessed",
        class: 'default',
      },
      {
        field: 'status',
        id: 1,
        label: "Processed",
        class: 'success',
      }
    ]
  }

  getFullStatus({
    status
  }) {
    return _.find(Withdrawal.getEnums(), {field: 'status', id: status})
  }

  user() {
    return this.belongsTo('App/Models/User')
  }
}

module.exports = Withdrawal
