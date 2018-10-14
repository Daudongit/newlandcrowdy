'use strict'

const UserAnnouncement = use('App/Models/UserAnnouncement');
const Announcement = use('App/Models/Announcement');
const User = use('App/Models/User');
const {
  validateAll
} = use('Validator');
const validationMessages = use('App/Helpers/ValidationMessages');

class AnnouncementController {
  async index({
    view,
    request
  }) {
    const page = request.input('page') || 1;
    return view.render('admin.announcements.index', {
      announcements: (await Announcement.query().orderBy('id', 'desc').paginate(page)).toJSON()
    });
  }

  async create({
    view
  }) {
    return view.render('admin.announcements.create');
  }

  async store({
    request,
    response,
    session,
  }) {

    const validationRules = {
      title: 'required',
      message: 'required',
    };

    const validation = await validateAll(request.all(), validationRules, validationMessages);

    if (validation.fails()) {
      session
        .withErrors(validation.messages())
      return response.redirect('back')
    }

    const createData = request.only(['title', 'message']);

    const announcement = await Announcement.create(createData)

    const users = await User.query().get();
    users.forEach((user) =>  {
      UserAnnouncement.create({
        user_id: user.id,
        announcement_id: announcement.id
      }).then(() => {})
    });

    session.flash({
      info: 'Announcements Made Successfully.'
    });

    return response.route('admin.announcements.index');
  }

}

module.exports = AnnouncementController
