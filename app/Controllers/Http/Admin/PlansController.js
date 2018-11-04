'use strict'

const ResourceController = require('../ResourceController');
class PlansController extends ResourceController {

  constructor() {
    super();
    this.model = use('App/Models/Plan');
    this.resourceRoute = 'admin.plans';
    this.indexRoute = `${this.resourceRoute}.index`;
    this.singleItem = 'Plan';
    this.mutipleItems = 'Plans';
    this.dataFields = ['name', 'interest', 'duration', 'capital', 'active', 'color'];
    this.validationRules = {
      name: 'required',
      interest: 'required',
      duration: 'required',
      capital: 'required',
      active: 'required',
      color: 'required',
    };

    this.hasCreate = true;
    this.hasDelete = true;
    this.hasShow = false;
    this.hasEdit = true;

    this.createAbles = [{
        label: "Name",
        name: "name",
        type: "text"
      },
      {
        label: "Interest",
        name: "interest",
        type: "number"
      },
      {
        label: "Duration",
        name: "duration",
        type: "number"
      },
      {
        label: "Capital",
        name: "capital",
        type: "number"
      },
      {
        label: "Color",
        name: "color",
        type: "text"
      },
      {
        label: "Active",
        name: "active",
        type: "select",
        options: [{
          value: '0',
          display: 'Not Active'
        }, {
          value: '1',
          display: 'Active'
        }]
      },
    ];

    this.editAbles = this.createAbles;

    this.showAbles = [{
      label: "Name",
      value: "name",
    },
    {
      label: "Interest",
      value: "interest",
      type: "rate",
    },
    {
        label: "Duration",
        value: "duration",
        type: "days",
      },
      {
        label: "Capital",
        value: "capital",
        type: "money"
      },
      {
        label: "Active",
        value: "fullActive",
        type: "label"
      },
      {
        label: "Color",
        value: "color",
        type: "color"
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

module.exports = PlansController
