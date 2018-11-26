'use strict';

const ResourceController = require('../ResourceController');
const Transaction = use('App/Models/Transaction');
class UserController extends ResourceController {

  constructor() {
    super();
    this.model = use('App/Models/User');
    this.resourceRoute = 'admin.users';
    this.indexRoute = `${this.resourceRoute}.index`;
    this.singleItem = 'User';
    this.mutipleItems = 'Users';
    this.dataFields = ['verified', 'suspended', 'first_name', 'last_name', 'email', 'phone_number'];

    this.indexWheres = [{
      role: 0
    }];
    this.searchAbles = [
      'email', 'username', 'first_name', 'last_name', 'phone_number'
    ];
    this.validationRules = {
      verified: 'required'
    };

    this.relationships = ['bankDetail'];

    this.hasCreate = false;
    this.hasDelete = false;
    this.hasShow = true;
    this.hasEdit = true;


    this.editAbles = [{
        label: "First Name",
        name: "first_name"
      },
      {
        label: "Last Name",
        name: "last_name",
      },
      {
        label: "Email",
        name: "email",
      },
      {
        label: "Phone Number",
        name: "phone_number",
      },
      {
        label: "Verified",
        name: "verified",
        type: "select",
        options: [{
          value: '0',
          display: 'Not Verified'
        }, {
          value: '1',
          display: 'Verified'
        }]
      },
      {
        label: "Suspended",
        name: "suspended",
        type: "select",
        options: [{
          value: '0',
          display: 'No'
        }, {
          value: '1',
          display: 'Yes'
        }]
      }
    ];

    this.indexAbles = [{
        label: "Email",
        value: "email"
      },
      {
        label: "Username",
        value: "username"
      },
      {
        label: "Full Name",
        value: "fullName"
      },
      {
        label: "Phone Number",
        value: "phone_number",
      },
      {
        label: "Wallet",
        value: "wallet",
        type: "money",
      },
      {
        label: "Verfied",
        value: "fullVerified",
        type: "label"
      },
      // {
      //   label: "Active",
      //   value: "fullActive",
      //   type: "label"
      // },
      {
        label: "Registered",
        value: "created_at",
        type: "date"
      },
      // {
      //   label: "Activated",
      //   value: "activated_at",
      //   type: "date"
      // }
    ];

    this.showAbles = this.indexAbles.concat([
      {
        label: "Address",
        value: "address",
      },
      {
        label: "City",
        value: "city",
      },
      {
        label: "State",
        value: "state",
      },
      {
        label: "Picture",
        value: "picture",
        type: 'image'
      },
      {
        label: "ID card",
        value: "id_card",
        type: 'image'
      },
    ]);

  }

  async edit({
    view,
    params
  }) {
    return view.render('admin.users.edit', {
      resourceDatum: await this.model.query().where({
        id: params.id
      }).first(),
      resourceRoute: this.resourceRoute,
      singleItem: this.singleItem,
      editAbles: this.editAbles
    });
  }

  async wallet({
    params,
    request,
    session,
    response
  }) {

    let query = this.model.query().where({
      id: params.id
    })
    const {
      amount,
      cd
    } = request.all();
    if (cd == 'debit') {
      query.decrement('wallet', amount).then(() => {})
    } else if (cd == 'credit') {
      query.increment('wallet', amount).then(() => {})
    }

    Transaction.create({
      user_id: params.id,
      amount: amount,
      message: `Admin ${cd}`,
      type: (cd == 'debit') ? Transaction.debit() : Transaction.credit(),
      from: `admin_${cd}`,
    }).then(() => {})

    session.flash({
      info: `Wallet ${cd} Successfully.`
    });

    return response.redirect('back');
  }

  async show({
    view,
    params
  }) {

    let query = this.model.query().where({
      id: params.id
    });
    this.relationships.forEach(relationship => {
      query = query.with(relationship);
    });
    const resourceDatum = (await query.first()).toJSON();

    return view.render('admin.users.show', {
      resourceDatum,
      resourceRoute: this.resourceRoute,
      singleItem: this.singleItem,
      hasEdit: this.hasEdit,
      hasDelete: this.hasDelete,
      showAbles: this.showAbles
    });
  }

}

module.exports = UserController
