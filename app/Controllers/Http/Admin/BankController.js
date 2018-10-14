'use strict';

const ResourceController = require('../ResourceController');
class BankController extends ResourceController{

  constructor() {
    super();
    this.model = use('App/Models/Bank');
    this.resourceRoute = 'admin.banks';
    this.indexRoute = `${this.resourceRoute}.index`;
    this.singleItem = 'Bank';
    this.mutipleItems = 'Banks';
    this.dataFields = ['name'];

    this.validationRules = {
        name: 'required',
    };

    this.relationships = [];

    // Views Generator
    this.hasCreate = true;
    this.hasDelete = false;
    this.hasShow = false;
    this.hasEdit = true;


    this.createAbles = [{
      label: "Name",
      name: "name",
      type: "text"
    }
  ];

  this.editAbles = this.createAbles;

  this.showAbles = [{
      label: "Name",
      value: "name"
    },
    {
      label: "Created",
      value: "created_at",
      type: "date"
    },
  ];

  this.indexAbles = this.showAbles;

  } 

}

module.exports = BankController
