'use strict';
const User = use('App/Models/User');
const Transaction = use('App/Models/Transaction');
const {
  validateAll
} = use('Validator');
const validationMessages = use('App/Helpers/ValidationMessages');
const ResourceController = require('../ResourceController');
class DepositController extends ResourceController{

  constructor() {
    super();
    this.model = use('App/Models/Deposit');
    this.resourceRoute = 'admin.deposits';
    this.indexRoute = `${this.resourceRoute}.index`;
    this.singleItem = 'Deposit';
    this.mutipleItems = 'Deposits';
    this.dataFields = ['status'];
    this.validationRules = {
      status: 'required',
    };
    this.relationships = ['user'];

    this.searchAbles = [
      'reference_no',
    ];
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
      display: 'Un Approve'
    }, {
      value: '1',
      display: 'Approve'
    }]
  }
];

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
      label: "Reference",
      value: "reference",
    },
    {
      label: "Platform",
      value: "platform",
    },
    {
      label: "Status",
      value: "fullStatus",
      type: 'label'
    },
    {
      label: "Submitted",
      value: "created_at",
      type: "date"
    },
  ];

  this.showAbles = this.indexAbles.concat([{
    label: "Proof",
    value: "file",
    type: "image"
  }, ]);

  } 
  
  async update({
    request,
    response,
    session,
    params
  }) {
    const validation = await validateAll(request.all(), this.validationRules, validationMessages);

    if (validation.fails()) {
      session
        .withErrors(validation.messages())
      return response.redirect('back')
    }

    const deposit = await this.model.query().where({
      id: params.id
    }).first();

    const user = await User.query().where({
      id: deposit.user_id
    }).first();

    const amountToCredit = await (new ActivateCheck).activateCheck(user, deposit.amount);

    User.query().where({
      id: deposit.user_id
    }).increment('wallet', amountToCredit).then(() => {})

    Transaction.create({
      user_id: deposit.user_id,
      amount: deposit.amount,
      message: `Wallet top up through deposit`,
      type: "0",
      from: 'deposits',
      from_id: deposit.id
    }).then(() => {})

    const updateData = request.only(this.dataFields);
    this.model.query().where({
      id: params.id
    }).update(updateData).then(() => {})

    session.flash({
      info: `${this.singleItem} Updated Successfully.`
    })

    return response.route(this.indexRoute);
  }

}

module.exports = DepositController
