'use strict';

const Model = use('Model');

class Payment extends Model {
  user() {
    return this.belongsTo('App/Models/User');
  }
}

module.exports = Payment;
