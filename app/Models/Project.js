'use strict';
const _ = require('lodash');
const Model = use('Model');

class Project extends Model {
  static get computed() {
    return ['perMonth', 'roi', 'fullActive','SoldStatusObj','fullName'];
  }

  getFullName({ flats,name }) {
    return `${flats} - ${name}`
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

  static getSoldStatusEnums() {
    return [
      {
        id: 0,
        label: 'Coming Soon',
        // label: 'Opening Soon',
        class: 'info',
      },
      {
        id: 1,
        label: 'Now Selling',
        class: 'success',
      },
      {
        id: 2,
        label: 'Sold Out',
        class: 'danger',
      },
    ];
  }

  getSoldStatusObj({sold_status}){
    return _.find(Project.getSoldStatusEnums(), { id: sold_status });
  }
}

module.exports = Project;
