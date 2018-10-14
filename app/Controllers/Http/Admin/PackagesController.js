'use strict'

const ResourceController = require('../ResourceController');
module.exports = class PackagesController extends ResourceController {

  constructor() {
    super();
    this.model = use('App/Models/Package');
    this.resourceRoute = 'admin.packages';
    this.indexRoute = `${this.resourceRoute}.index`;
    this.singleItem = 'Package';
    this.mutipleItems = 'Packages';
    this.relationships = ['user','plan'];

    this.fields = [
        {
            label: "User",
            name: "user.fullName",
            type: "text",
            show: true,
            edit: true,
            search: true,
            index: true,
            validation: 'required',
        },
        {
            label: "Interest",
            name: "interest",
            type: "text",
            show: true,
            edit: true,
            search: true,
            type: 'number',
            index: true,
            validation: 'required',
        },
        {
            label: "Duration",
            name: "duration",
            type: "text",
            show: true,
            type: 'number',
            edit: true,
            search: true,
            index: true,
            required: true,
            validation: 'required',
        },
        {
            label: "Capital",
            name: "capital",
            type: "text",
            show: true,
            edit: true,
            search: true,
            type: 'number',
            index: true,
            validation: 'required',
        },
        {
            label: "Created",
            name: "created_at",
            type: "date",
            index: true,
        },
    ]

    // 

    //   {
    //     label: "Status",
    //     name: "status",
    //     type: "select",
    //     options: [{
    //       value: '0',
    //       display: 'Hide'
    //     }, {
    //       value: '1',
    //       display: 'Live'
    //     }]
    //   }
  
  }

}
 