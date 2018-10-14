'use strict'
const _ = require('lodash');

const Model = use('Model')

class Support extends Model {

    static get computed() {
        return ['fullStatus']
      }

      static getEnums() {
        return [
          {
            field: 'status',
            id: 0,
            label: "Not Opened",
            class: 'warning',
          },
          {
            field: 'status',
            id: 1,
            label: "Replied",
            class: 'success',
          }
        ]
      }
    
      getFullStatus({
        status
      }) {
        return _.find(Support.getEnums(), {field: 'status', id: status})
      }

      user() {
        return this.belongsTo('App/Models/User')
      }

}

module.exports = Support
