'use strict';
const ResourceController = require('../ResourceController');
module.exports = class NotificationController extends ResourceController {
  constructor() {
    super();
    this.model = use('App/Models/Notification');
    this.resourceRoute = 'admin.notifications';
    this.indexRoute = `${this.resourceRoute}.index`;
    this.singleItem = 'notification';
    this.mutipleItems = 'notifications';
    this.relationships = ['user','package.project'];
    this.noAction = true;

    this.indexAbles = [
      {
        label: 'Username',
        value: 'user.fullName',
      },
      {
        label: 'Package',
        value: 'package.project.fullName',
      },
      {
        label: 'Read Status',
        value: 'isReadStatus',
        type: 'label',
      },
      {
        label: 'Created',
        value: 'created_at',
        type: 'date',
      },
    ];
  }
};
