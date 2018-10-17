'use strict'
const _ = require('lodash');

const Model = use('Model')

class Package extends Model {

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
        label: "Running",
        class: 'success',
      },
      {
        field: 'status',
        id: 2,
        label: "Ended",
        class: 'primary',
      }

    ]
  }

  static get computed() {
    return ['fullStatus']
  }
  
  getFullStatus({
    status
  }) {
      return _.find(Package.getEnums(), {field: 'status', id: status})
  }

  user() {
    return this.belongsTo('App/Models/User')
  }
  
  plan() {
    return this.belongsTo('App/Models/Plan')
  }

  payments(){
    return this.hasMany('App/Models/Payment')
  }


}

module.exports = Package
