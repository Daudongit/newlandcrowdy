'use strict';

const ResourceController = require('../ResourceController');
class BankController extends ResourceController {
  constructor() {
    super();
    this.model = use('App/Models/BankOption');
    this.resourceRoute = 'admin.bankoptions';
    this.indexRoute = `${this.resourceRoute}.index`;
    this.singleItem = 'Bank Option';
    this.mutipleItems = 'Bank Options';
    this.dataFields = ['bank_name', 'account_name', 'account_number'];

    this.validationRules = {
      bank_name: 'required',
      account_name: 'required',
      account_number: 'required',
    };

    this.relationships = [];

    // Views Generator
    this.hasCreate = true;
    this.hasDelete = true;
    this.hasShow = false;
    this.hasEdit = true;

    this.createAbles = [
      {
        label: 'Bank Name',
        name: 'bank_name',
        type: 'text',
      },
      {
        label: 'Account Name',
        name: 'account_name',
        type: 'text',
      },
      {
        label: 'Account Number',
        name: 'account_number',
        type: 'number',
      },
    ];

    this.editAbles = this.createAbles;

    this.showAbles = [
      {
        label: 'Bank Name',
        value: 'bank_name',
      },
      {
        label: 'Account Name',
        value: 'account_name',
      },
      {
        label: 'Account Number',
        value: 'account_number',
      },
      {
        label: 'Created',
        value: 'created_at',
        type: 'date',
      },
    ];

    this.indexAbles = this.showAbles;
  }
}

module.exports = BankController;
