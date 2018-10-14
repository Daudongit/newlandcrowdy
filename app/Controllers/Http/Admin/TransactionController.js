'use strict';
const ResourceController = require('../ResourceController');
class TransactionController extends ResourceController{

  constructor() {
    super();
    this.model = use('App/Models/Transaction');
    this.resourceRoute = 'admin.transactions';
    this.indexRoute = `${this.resourceRoute}.index`;
    this.singleItem = 'Transaction';
    this.mutipleItems = 'Transactions';
    this.relationships = ['user'];
    this.noAction = true;

    this.filterFields = [
      {
        field: 'from',
        id: 'online_deposit',
        title: "Online Deposit"
      },
  ];

    this.indexAbles = [{
      label: "User",
      value: "user.fullName"
    }, {
      label: "Message",
      value: "message"
    },
    // {
    //   label: "From",
    //   value: "fullFrom"
    // },
    {
      label: "Amount",
      value: "amount",
      type: "money"
    },
    {
      label: "Type",
      value: "fullType",
      type: 'label'
    },
    {
      label: "Created",
      value: "created_at",
      type: "date"
    },
  ];

  } 

}

module.exports = TransactionController