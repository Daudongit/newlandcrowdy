'use strict';
const ResourceController = require('../ResourceController');
module.exports = class PaymentsController extends ResourceController {
  constructor() {
    super();
    this.model = use('App/Models/Payment');
    this.resourceRoute = 'app.payments';
    this.indexRoute = `${this.resourceRoute}.index`;
    this.singleItem = 'Payment';
    this.mutipleItems = 'Payments';
    this.relationships = ['user'];
    this.noAction = true;

    this.indexAbles = [
      {
        label: 'Username',
        value: 'user.fullName',
      },
      {
        label: 'Amount',
        value: 'amount',
        type: 'money',
      },
      //   {
      //     label: "Status",
      //     value: "fullStatus",
      //     type: 'label'
      //   },
      {
        label: 'Created',
        value: 'created_at',
        type: 'date',
      },
    ];
  }

  async packages({ view, request, params }) {
    const page = request.input('page') || 1;
    return view.render('crud.index', {
      mutipleItems: this.mutipleItems,
      singleItem: this.singleItem,
      resourceData: (
        await this.model
          .query()
          .where({
            package_id: params.id,
          })
          .with('user')
          .orderBy('id', 'desc')
          .paginate(page)
      ).toJSON(),
      indexAbles: this.indexAbles,
      hasCreate: false,
      noAction: true,
    });
  }
};
