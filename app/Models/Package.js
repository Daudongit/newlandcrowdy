'use strict';
const _ = require('lodash');

const moment = require('moment');
const Model = use('Model');

class Package extends Model {
  getNextInterestDays({ started, status, last_process }) {
    if (status === 1) {
      const _last_process = last_process ? last_process : started;
      const end = moment(_last_process);
      const start = moment();
      return 30 - (Math.floor(moment.duration(start.diff(end)).asDays()) % 30);
    }
    return 'N/A';
  }

  static getEnums() {
    return [
      {
        field: 'status',
        id: 0,
        label: 'Un Approved',
        class: 'warning',
      },
      {
        field: 'status',
        id: 1,
        label: 'Running',
        class: 'success',
      },
      {
        field: 'status',
        id: 2,
        label: 'Ended',
        class: 'primary',
      },
      {
        field: 'status',
        id: 3,
        label: 'Paused',
        class: 'danger',
      },
    ];
  }

  static get computed() {
    return ['fullStatus', 'nextInterestDays'];
  }

  getFullStatus({ status }) {
    return _.find(Package.getEnums(), { field: 'status', id: status });
  }

  user() {
    return this.belongsTo('App/Models/User');
  }

  project() {
    return this.belongsTo('App/Models/Project');
  }

  payments() {
    return this.hasMany('App/Models/Payment');
  }
}

module.exports = Package;
