'use strict';
const _ = require('lodash');
const Model = use('Model');

class Project extends Model {
  static get computed() {
    return ['perMonth', 'roi', 'fullActive'];
  }

  getFullActive({ active }) {
    return _.find(Project.getEnums(), { field: 'active', id: active });
  }

  static getEnums() {
    return [
      {
        field: 'active',
        id: 0,
        label: 'Coming Soon',
        class: 'warning',
      },
      {
        field: 'active',
        id: 1,
        label: 'Active',
        class: 'success',
      },
      {
        field: 'active',
        id: 2,
        label: 'Sold Out',
        class: 'default',
      },
    ];
  }

  getRoi({ annum_return, duration }) {
    return (annum_return, duration) / 100;
  }
}

module.exports = Project;
