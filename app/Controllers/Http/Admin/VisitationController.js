'use strict';
const ResourceController = require('../ResourceController');
module.exports = class VisitationController extends ResourceController {
  constructor() {
    super();
    this.model = use('App/Models/Visitation');
    this.resourceRoute = 'admin.visitations';
    this.indexRoute = `${this.resourceRoute}.index`;
    this.singleItem = 'visitation';
    this.mutipleItems = 'visitations';
    this.relationships = ['user','project'];

    this.hasShow = true;

    this.indexAbles = [
      {
        label: 'Username',
        value: 'user.fullName',
      },
      {
        label: 'Email',
        value: 'user.email',
      },
      {
        label: 'Project',
        value: 'project.name',
      },
      {
        label: 'Subject',
        value: 'subject',
      },
      {
        label: 'Created',
        value: 'created_at',
        type: 'date',
      },
    ];

    this.showAbles = this.indexAbles.concat([
      {
        label: 'Message',
        value: 'message',
      }
    ])
  }
};
