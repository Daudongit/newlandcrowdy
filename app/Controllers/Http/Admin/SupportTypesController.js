'use strict';

const ResourceController = require('../ResourceController');
class SupportTypesController extends ResourceController {
  constructor() {
    super();
    this.model = use('App/Models/SupportType');
    this.resourceRoute = 'admin.supporttypes';
    this.indexRoute = `${this.resourceRoute}.index`;
    this.singleItem = 'Support Type';
    this.mutipleItems = 'Support Types';
    this.dataFields = ['name'];
    this.validationRules = {
      name: 'required',
    };
    this.relationships = [];

    // Views Generator
    this.hasCreate = true;
    this.hasDelete = true;
    this.hasShow = false;
    this.hasEdit = true;

    this.createAbles = [
      {
        label: 'Name',
        name: 'name',
        type: 'text',
      },
    ];

    this.editAbles = this.createAbles;

    this.indexAbles = [
      {
        label: 'Name',
        value: 'name',
      },
    ];
  }
}

module.exports = SupportTypesController;
