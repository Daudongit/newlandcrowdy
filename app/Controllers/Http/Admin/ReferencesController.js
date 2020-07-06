'use strict';

const ResourceController = require('../ResourceController');
class ReferencesController extends ResourceController {
  constructor() {
    super();
    this.model = use('App/Models/Reference');
    this.resourceRoute = 'admin.references';
    this.indexRoute = `${this.resourceRoute}.index`;
    this.singleItem = 'Reference';
    this.mutipleItems = 'References';
    this.dataFields = ['value', 'title'];
    this.validationRules = {
      value: 'required',
    };
    this.relationships = [];

    // Views Generator
    this.hasCreate = false;
    this.hasDelete = false;
    this.hasShow = false;
    this.hasEdit = true;

    this.editAbles = [
      {
        label: 'Title',
        name: 'title',
        type: 'title',
      },
      {
        label: 'Value',
        name: 'value',
        type: 'text',
      },
    ];

    this.indexAbles = [
      {
        label: 'Title',
        value: 'title',
      },
      {
        label: 'Slug',
        value: 'slug',
      },
      {
        label: 'Value',
        value: 'value',
        type: 'text',
      },
      {
        label: 'Updated Last',
        value: 'updated_at',
        type: 'date',
      },
    ];
  }
}

module.exports = ReferencesController;
