'use strict';
const User = use('App/Models/User');
const Transaction = use('App/Models/Transaction');
const Package = use('App/Models/Package');
const { validateAll } = use('Validator');
const validationMessages = use('App/Helpers/ValidationMessages');
const ResourceController = require('../ResourceController');
const moment = require('moment');
module.exports = class PackagesController extends ResourceController {
  constructor() {
    super();
    this.model = use('App/Models/Package');
    this.resourceRoute = 'admin.packages';
    this.indexRoute = `${this.resourceRoute}.index`;
    this.singleItem = 'Package';
    this.mutipleItems = 'Packages';
    this.relationships = ['user', 'project'];

    this.showLinks = [
      {
        link: 'admin.payments.packages',
        title: 'Payments',
      },
    ];

    this.dataFields = ['status','is_fully_pay'];
    this.validationRules = {
      status: 'required',
    };

    // Views Generator
    this.hasCreate = false;
    this.hasDelete = false;
    this.hasShow = true;
    this.hasEdit = true;

    this.editAbles = [
      {
        label: 'Status',
        name: 'status',
        type: 'select',
        options: [
          {
            value: '1',
            display: 'Running',
          },
          {
            value: '3',
            display: 'Paused',
          },
        ],
      },
      {
        label: 'Year Payment Status',
        name: 'is_fully_pay',
        type: 'select',
        options: [
          {
            value: '0',
            display: 'Patially Paid',
          },
          {
            value: '1',
            display: 'Fully Paid',
          },
        ],
      },
    ];

    this.indexAbles = [
      {
        label: 'User',
        value: 'user.fullName',
      },
      {
        label: 'Annum Return',
        value: 'project.annum_return',
        type: 'money',
      },
      {
        label: 'Next Interest Days',
        value: 'nextInterestDays',
      },
      {
        label: 'Duration',
        value: 'project.duration',
      },
      {
        label: 'Capital',
        value: 'amount',
        type: 'money',
      },
      {
        label: 'Status',
        value: 'fullStatus',
        type: 'label',
      },
      {
        label: 'Started',
        value: 'started',
        type: 'date',
      },
      {
        label: 'Created',
        value: 'created_at',
        type: 'date',
      },
    ];

    this.showAbles = this.indexAbles;
  }
};

//   async update({
//     request,
//     response,
//     session,
//     params
//   }) {
//     const validation = await validateAll(request.all(), this.validationRules, validationMessages);

//     if (validation.fails()) {
//       session
//         .withErrors(validation.messages())
//       return response.redirect('back')
//     }
//     const updateData = request.only(this.dataFields);

//     const deposit = await this.model.query().where({
//       id: params.id
//     }).first();
//     if(deposit.status == 0 && updateData.status == 1){

//       const user = await User.query().where({
//         id: deposit.user_id
//       }).first();

//       Package.query().where({
//         id: deposit.package_id
//       }).update({
//         status: 1,
//         started: moment().format("YYYY-MM-DD HH:mm:ss")
//       }).then(() => {})

//       Transaction.create({
//         user_id: user.id,
//         message: "Bought Package Through Bank Deposit",
//         from: "bank_deposit",
//         amount: deposit.amount,
//         from_id: deposit.package_id,
//         type: Transaction.debit()
//       });

//     }

//     this.model.query().where({
//       id: params.id
//     }).update({
//       ...updateData,
//       approved: moment().format("YYYY-MM-DD HH:mm:ss")
//     }).then(() => {})

//     session.flash({
//       info: `${this.singleItem} Updated Successfully.`
//     })

//     return response.route(this.indexRoute);
//   }

// }
