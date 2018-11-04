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
    this.dataFields = ['name', 'role', 'message'];
    this.validationRules = {
      name: 'required',
      role: 'required',
      message: 'required',
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
        label: "Role",
        name: "role",
        type: "text"
      },
      {
        label: "Message",
        name: "message",
        type: "textarea"
      },
    ];

    this.editAbles = this.createAbles;

    this.showAbles = [{
      label: "Name",
      value: "name",
    },
    {
      label: "Role",
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
    ];

    this.indexAbles = this.showAbles;

  }

}

module.exports = TestimonialsController
