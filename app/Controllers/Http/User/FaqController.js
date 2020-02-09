'use strict';
const Faq = use('App/Models/Faq');

class FaqController {
  async index({ view }) {
    return view.render('app.faqs.index', {
      faqs: await Faq.query().get(),
    });
  }
}

module.exports = FaqController;
