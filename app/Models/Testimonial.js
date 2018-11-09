'use strict'
const _ = require('lodash');

const Model = use('Model')

class Testimonial extends Model {

    static get computed() {
        return ['fullDisplay']
      }

      static getEnums() {
        return [
          {
            field: 'display',
            id: 0,
            label: "Hidden",
            class: 'warning',
          },
          {
            field: 'display',
            id: 1,
            label: "Live",
            class: 'success',
          }
        ]
      }
    
      getFullDisplay({
        display
      }) {
        return _.find(Testimonial.getEnums(), {field: 'display', id: display})
      }

      user() {
        return this.belongsTo('App/Models/User')
      }

}

module.exports = Testimonial
