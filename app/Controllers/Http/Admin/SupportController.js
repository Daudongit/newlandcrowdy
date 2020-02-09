'use strict';

const Support = use('App/Models/Support');
const { validateAll } = use('Validator');
const validationMessages = use('App/Helpers/ValidationMessages');

class SupportController {
  async index({ view, request }) {
    const page = request.input('page') || 1;
    return view.render('admin.supports.index', {
      supports: (
        await Support.query()
          .orderBy('id', 'desc')
          .with('user')
          .paginate(page)
      ).toJSON(),
    });
  }

  async edit({ view, params }) {
    return view.render('admin.supports.edit', {
      support: (
        await Support.query()
          .where({
            id: params.id,
          })
          .with('user')
          .first()
      ).toJSON(),
    });
  }

  async update({ request, response, session, params, auth }) {
    const validationRules = {
      reply: 'required',
    };

    const validation = await validateAll(request.all(), validationRules, validationMessages);

    if (validation.fails()) {
      session.withErrors(validation.messages());
      return response.redirect('back');
    }

    const updateData = request.only(['reply']);

    Support.query()
      .where({
        id: params.id,
      })
      .update({ ...updateData, reply_by: auth.user.id, status: 1 })
      .then(() => {});

    session.flash({
      info: 'Message Updated Successfully.',
    });

    return response.route('admin.supports.index');
  }
}

module.exports = SupportController;
