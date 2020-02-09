'use strict';

const ResourceController = require('../ResourceController');
class FaqsController extends ResourceController {
  constructor() {
    super();
    this.model = use('App/Models/Faq');
    this.resourceRoute = 'admin.faqs';
    this.indexRoute = `${this.resourceRoute}.index`;
    this.singleItem = 'Faq';
    this.mutipleItems = 'Faqs';
    this.dataFields = ['question', 'answer'];
    this.validationRules = {
      question: 'required',
      answer: 'required',
    };

    this.hasCreate = true;
    this.hasDelete = true;
    this.hasShow = true;
    this.hasEdit = true;

    this.createAbles = [
      {
        label: 'Question',
        name: 'question',
        type: 'text',
      },
      {
        label: 'Answer',
        name: 'answer',
        type: 'textarea',
      },
    ];

    this.editAbles = this.createAbles;

    this.showAbles = [
      {
        label: 'Question',
        value: 'question',
      },
      {
        label: 'Answer',
        value: 'answer',
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

module.exports = FaqsController;
