'use strict';

const ResourceController = require('../ResourceController');
class ProjectsController extends ResourceController {
  constructor() {
    super();
    this.model = use('App/Models/Project');
    this.resourceRoute = 'admin.projects';
    this.indexRoute = `${this.resourceRoute}.index`;
    this.singleItem = 'Project';
    this.mutipleItems = 'Projects';
    this.dataFields = ['name', 'interest', 'duration', 'capital', 'active', 'flats', 'slots'];
    this.validationRules = {
      name: 'required',
      interest: 'required',
      duration: 'required',
      capital: 'required',
      active: 'required',
      flats: 'required',
      slots: 'required',
    };

    this.hasCreate = true;
    this.hasDelete = true;
    this.hasShow = false;
    this.hasEdit = true;

    this.createAbles = [
      {
        label: 'Name',
        name: 'name',
        type: 'text',
      },
      {
        label: 'Interest',
        name: 'interest',
        type: 'number',
      },
      {
        label: 'Duration',
        name: 'duration',
        type: 'number',
      },
      {
        label: 'Capital',
        name: 'capital',
        type: 'number',
      },
      {
        label: 'Flats',
        name: 'flats',
        type: 'text',
      },
      {
        label: 'Slots',
        name: 'slots',
        type: 'number',
      },
      {
        label: 'Active',
        name: 'active',
        type: 'select',
        options: [
          {
            value: '0',
            display: 'Not Active',
          },
          {
            value: '1',
            display: 'Active',
          },
        ],
      },
    ];

    this.editAbles = this.createAbles;

    this.showAbles = [
      {
        label: 'Name',
        value: 'name',
      },
      {
        label: 'Interest',
        value: 'interest',
        type: 'rate',
      },
      {
        label: 'Duration',
        value: 'duration',
        type: 'days',
      },
      {
        label: 'Capital',
        value: 'capital',
        type: 'money',
      },
      {
        label: 'Active',
        value: 'fullActive',
        type: 'label',
      },
      {
        label: 'Flats',
        value: 'flats',
        type: 'flats',
      },
      {
        label: 'Slots',
        value: 'slots',
        type: 'slots',
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

module.exports = ProjectsController;
