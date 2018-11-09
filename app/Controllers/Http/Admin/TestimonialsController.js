'use strict'

const ResourceController = require('../ResourceController');
class TestimonialsController extends ResourceController {

  constructor() {
    super();
    this.model = use('App/Models/Testimonial');
    this.resourceRoute = 'admin.testimonials';
    this.indexRoute = `${this.resourceRoute}.index`;
    this.singleItem = 'Testimonial';
    this.mutipleItems = 'Testimonials';
    this.dataFields = ['name', 'role', 'message', 'display'];
    this.validationRules = {
      name: 'required',
      role: 'required',
      message: 'required',
      display: 'required',
    };

    this.hasCreate = true;
    this.hasDelete = true;
    this.hasShow = true;
    this.hasEdit = true;

    this.createAbles = [{
        label: "Name",
        name: "name",
        type: "text"
      },
      {
        label: "Profession",
        name: "role",
        type: "text"
      },
      {
        label: "Message",
        name: "message",
        type: "textarea"
      },
      {
        label: "Display",
        name: "display",
        type: "select",
        options: [{
          value: '0',
          display: 'Hidden'
        }, {
          value: '1',
          display: 'Live'
        }]
      },
    ];

    this.editAbles = this.createAbles;

    this.showAbles = [{
      label: "Name",
      value: "name",
    },
    {
      label: "Profession",
      value: "role",
    },
    {
      label: "Message",
      value: "message",
    },
      {
        label: "Created",
        value: "created_at",
        type: "date"
      },
      {
        label: "Display",
        value: "fullDisplay",
        type: "label"
      },
    ];

    this.indexAbles = this.showAbles;

  }

}

module.exports = TestimonialsController
