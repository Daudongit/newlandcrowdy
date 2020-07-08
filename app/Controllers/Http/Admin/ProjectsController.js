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
    this.dataFields = [
      'name', 'annum_return', 'duration', 'capital',
       'active', 'flats', 'slots','sold_status'
    ];
    this.fileFields = ['feature_img'];
    this.validationRules = {
      name: 'required',
      annum_return: 'required',
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
        label: 'Location',
        name: 'name',
        type: 'text',
      },
      {
        label: 'Annum Return',
        name: 'annum_return',
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
      {
        label: 'Sold Status',
        name: 'sold_status',
        type: 'select',
        options: [
          {
            value: '0',
            display: 'Opening Soon',
          },
          {
            value: '1',
            display: 'Now Selling',
          },
          {
            value: '2',
            display: 'Sold Out',
          },
        ],
      },
      {
        label: 'Feature Image',
        name: 'feature_img',
        type: 'image',
      },
    ];

    this.editAbles = this.createAbles;

    this.showAbles = [
      {
        label: 'Location',
        value: 'name',
      },
      {
        label: 'Annum Return',
        value: 'annum_return',
        type: 'money',
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
