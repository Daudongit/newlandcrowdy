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

    this.indexShow = [
      {
        label: 'Username',
        value: 'user.fullName',
      },
      {
        label: 'Email',
        value: 'user.email',
      },
      {
        label: 'Subject',
        value: 'subject',
      }
    ];

    this.indexAbles = this.indexShow.concat([
      {
        label: 'Project',
        value: 'project.name',
      },
      {
        label: 'Created',
        value: 'created_at',
        type: 'date',
      }
    ]);

    this.showAbles = this.indexShow.concat([
      {
        label: 'Project',
        value: 'project.fullName',
      },
      {
        label: 'Created',
        value: 'created_at',
        type: 'date',
      },
      {
        label: 'Message',
        value: 'message',
      }
    ])
  }
};
