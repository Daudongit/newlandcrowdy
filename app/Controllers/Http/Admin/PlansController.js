// 'use strict'

// const ResourceController = require('../ResourceController');
// module.exports = class PlansController extends ResourceController {

//   constructor() {
//     super();
//     this.model = use('App/Models/');
//     this.resourceRoute = 'admin.plans';
//     this.indexRoute = `${this.resourceRoute}.index`;
//     this.singleItem = 'Plan';
//     this.mutipleItems = 'Plans';
//     this.enableDelete = true;
//     this.relationships = [];

//     this.fields = [
//         {
//             label: "Name",
//             name: "name",
//             type: "text",
//             create: true,
//             edit: true,
//             search: true,
//             index: true,
//             validation: 'required',
//         },
//         {
//             label: "Interest",
//             name: "interest",
//             type: "text",
//             create: true,
//             edit: true,
//             search: true,
//             type: 'number',
//             index: true,
//             validation: 'required',
//         },
//         {
//             label: "Duration",
//             name: "duration",
//             type: "text",
//             create: true,
//             type: 'number',
//             edit: true,
//             search: true,
//             index: true,
//             required: true,
//             validation: 'required',
//         },
//         {
//             label: "Capital",
//             name: "capital",
//             type: "text",
//             create: true,
//             edit: true,
//             search: true,
//             type: 'number',
//             index: true,
//             validation: 'required',
//         },
//         {
//             label: "Created",
//             name: "created_at",
//             type: "date",
//             index: true,
//         },
//     ]
  
//   }

// }
 

'use strict'

const ResourceController = require('../ResourceController');
class FaqsController extends ResourceController {

  constructor() {
    super();
    this.model = use('App/Models/Plan');
    this.resourceRoute = 'admin.plans';
    this.indexRoute = `${this.resourceRoute}.index`;
    this.singleItem = 'Plan';
    this.mutipleItems = 'Plans';
    this.dataFields = ['name', 'interest', 'duration', 'capital', 'active'];
    this.validationRules = {
      name: 'required',
      interest: 'required',
      duration: 'required',
      capital: 'required',
      active: 'required',
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
        label: "Created",
        value: "created_at",
        type: "date"
      },
    ];

    this.indexAbles = this.showAbles;

  }

}

module.exports = FaqsController
