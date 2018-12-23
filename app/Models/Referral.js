'use strict'
const Model = use('Model')
const _ = require('lodash');

class Referral extends Model {

    static getEnums() {
        return [
            {
            field: 'status',
            id: 1,
            label: "Bought Package",
            class: 'success',
            },
            {
            field: 'status',
            id: 0,
            label: "Awaiting Package",
            class: 'default',
            }
        ]
    }

    static get computed() {
        return ['fullStatus']
      }

    getFullStatus({
        status
    }) {
        return _.find(Referral.getEnums(), {field: 'status', id: status})
    }

    user() {
        return this.belongsTo('App/Models/User')
    }

    referred_by_user() {
        return this.belongsTo('App/Models/User', 'referred_by')
    }

}

module.exports = Referral;
