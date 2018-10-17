'use strict'

const _ = require('lodash');

const Model = use('Model')

class Deposit extends Model {
  user() {
    return this.belongsTo('App/Models/User')
  }
    
  getFullStatus({
    status
  }) {
      return _.find(Deposit.getEnums(), {field: 'status', id: status})
  }

  static getEnums() {
    return [
      {
        field: 'status',
        id: 0,
        label: "Un Approved",
        class: 'warning',
      },
      {
        field: 'status',
        id: 1,
        label: "Approved",
        class: 'success',
      }
    ]
  }

  static get computed() {
    return ['fullStatus']
  }

}

module.exports = Deposit
