'use strict'

const ResourceController = require('../ResourceController');
class ReferralController extends ResourceController{

  constructor() {
    super();
    this.model = use('App/Models/Referral');
    this.resourceRoute = 'admin.referrals';
    this.indexRoute = `${this.resourceRoute}.index`;
    this.singleItem = 'Referral';
    this.mutipleItems = 'Referrals';

    this.noAction = true;

    this.relationships = ['user', 'referred_by_user'];

    this.indexAbles = [{
        label: "User",
        value: "user.fullName"
      },
      {
        label: "Reffered By",
        value: "referred_by_user.fullName",
        type: 'user'
      },
      {
        label: "Amount",
        value: "amount",
        type: 'money'
      },
      {
        label: "Status",
        value: "fullStatus",
        type: 'label'
      },

    ];
  }

}

module.exports = ReferralController

