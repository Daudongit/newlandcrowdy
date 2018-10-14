'use strict';

const ResourceController = require('../ResourceController');
class WithdrawalController extends ResourceController {

  constructor() {
    super();
    this.model = use('App/Models/Withdrawal');
    this.resourceRoute = 'admin.withdrawals';
    this.indexRoute = `${this.resourceRoute}.index`;
    this.singleItem = 'Withdrawal';
    this.mutipleItems = 'Withdrawal';
    this.dataFields = ['status'];
    this.validationRules = {
      status: 'required'
    };
    this.relationships = ['user'];

    // Views Generator
    this.hasCreate = false;
    this.hasDelete = false;
    this.hasShow = true;
    this.hasEdit = true;


    this.editAbles = [{
      label: "Status",
      name: "status",
      type: "select",
      options: [{
        value: '0',
        display: 'Un Processed'
      }, {
        value: '1',
        display: 'Processed'
      }]
    }];

    this.indexAbles = [{
        label: "User",
        value: "user.fullName"
      },
      {
        label: "Amount",
        value: "amount",
        type: "money"
      },
      {
        label: "Charge",
        value: "charge",
        type: "money"
      },
      {
        label: "Status",
        value: "fullStatus",
        type: "label"
      },
      {
        label: "Created",
        value: "created_at",
        type: "date"
      }
    ];

    this.showAbles = this.indexAbles.concat([{
      label: "Approved",
      value: "updated_at",
      type: "date"
    }]);

  }

}

module.exports = WithdrawalController
