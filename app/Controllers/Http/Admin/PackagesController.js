'use strict';
const User = use('App/Models/User');
const Transaction = use('App/Models/Transaction');
const Package = use('App/Models/Package');
const {
  validateAll
} = use('Validator');
const validationMessages = use('App/Helpers/ValidationMessages');
const ResourceController = require('../ResourceController');
const moment = require("moment");
module.exports = class PackagesController extends ResourceController{

  constructor() {
    super();
    this.model = use('App/Models/Package');
    this.resourceRoute = 'admin.packages';
    this.indexRoute = `${this.resourceRoute}.index`;
    this.singleItem = 'Package';
    this.mutipleItems = 'Packages';
    this.relationships = ['user','plan'];

    super();
    this.model = use('App/Models/Deposit');
    this.resourceRoute = 'admin.deposits';
    this.indexRoute = `${this.resourceRoute}.index`;
    this.singleItem = 'Deposit';
    this.mutipleItems = 'Deposits';
    this.dataFields = ['status'];
    this.editText = "Approve";
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


    this.fields = [
        {
            label: "User",
            name: "user.fullName",
            type: "text",
            show: true,
            edit: true,
            search: true,
            index: true,
            validation: 'required',
        },
        {
            label: "Interest",
            name: "interest",
            type: "text",
            show: true,
            edit: true,
            search: true,
            type: 'number',
            index: true,
            validation: 'required',
        },
        {
            label: "Duration",
            name: "duration",
            type: "text",
            show: true,
            type: 'number',
            edit: true,
            search: true,
            index: true,
            required: true,
            validation: 'required',
        },
        {
            label: "Capital",
            name: "capital",
            type: "text",
            show: true,
            edit: true,
            search: true,
            type: 'number',
            index: true,
            validation: 'required',
        },
        {
            label: "Created",
            name: "created_at",
            type: "date",
            index: true,
        },
    ]

    // 

    //   {
    //     label: "Status",
    //     name: "status",
    //     type: "select",
    //     options: [{
    //       value: '0',
    //       display: 'Hide'
    //     }, {
    //       value: '1',
    //       display: 'Live'
    //     }]
    //   }
  
  }

}




  constructor() {
   
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
    const updateData = request.only(this.dataFields);

    const deposit = await this.model.query().where({
      id: params.id
    }).first();
    if(deposit.status == 0 && updateData.status == 1){

      const user = await User.query().where({
        id: deposit.user_id
      }).first();

      Package.query().where({
        id: deposit.package_id
      }).update({
        status: 1,
        started: moment().format("YYYY-MM-DD HH:mm:ss")
      }).then(() => {})

      Transaction.create({
        user_id: user.id,
        message: "Bought Package Through Bank Deposit",
        from: "bank_deposit",
        amount: deposit.amount,
        from_id: deposit.package_id,
        type: Transaction.debit()
      });

    }

    this.model.query().where({
      id: params.id
    }).update({
      ...updateData,
      approved: moment().format("YYYY-MM-DD HH:mm:ss")
    }).then(() => {})

    session.flash({
      info: `${this.singleItem} Updated Successfully.`
    })

    return response.route(this.indexRoute);
  }

}

module.exports = PackagesController

 