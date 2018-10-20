'use strict';
const ResourceController = require('../ResourceController');
class TransactionController extends ResourceController{

  constructor() {
    super();
    this.model = use('App/Models/Transaction');
    this.resourceRoute = 'app.transactions';
    this.indexRoute = `${this.resourceRoute}.index`;
    this.singleItem = 'Transaction';
    this.mutipleItems = 'Transactions';
    this.relationships = ['user'];
    this.noAction = true;
    this.whereMe = true;
    
    this.filterFields = [
      {
        field: 'from',
        id: 'online_deposit',
        title: "Online Deposit"
      },
      {
        field: 'from',
        id: 'bank_deposit',
        title: "Bank Deposit"
      }
    ];

    this.indexAbles = [{
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

  async from({
    view,
    request,
    params
  }) {
    let mutipleItems = "";
    let singleItem = "";
    switch(params.from){
      case "loan_payment":
        mutipleItems = "Payments";
        singleItem = "Payment";
        break;
      case "investment_payout":
      mutipleItems = "Dividends";
        singleItem = "Dividend";
        break;
    }

    const page = request.input('page') || 1;
    return view.render('crud.index', {
      mutipleItems,
      singleItem,
      // resourceRoute: 'app.inves',
      resourceData: (await this.model.query().where({
        from: params.from,
        from_id: params.id 
      }).orderBy('id', 'desc').paginate(page)).toJSON(),
      indexAbles: this.indexAbles,
      hasCreate: false,
      noAction: true
    });
  }

}

module.exports = TransactionController