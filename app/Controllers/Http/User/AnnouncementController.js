'use strict'

const Announcement = use('App/Models/Announcement');
const UserAnnouncement = use('App/Models/UserAnnouncement');

class AnnouncementController {
  async index({
    auth,
    view,
    request
  }) {
    const page = request.input('page') || 1;
    console.log( (await UserAnnouncement.query().where({
      user_id: auth.user.id
    }).with('announcement')
    .orderBy('id', 'desc').paginate(page)).toJSON());
    return view.render('app.announcements.index', {
      announcements: (await UserAnnouncement.query().where({
          user_id: auth.user.id
        }).with('announcement')
        .orderBy('id', 'desc').paginate(page)).toJSON()
    });
  }

  async show({
    params,
    view,
    auth
  }) {
    await UserAnnouncement.query().where({
      announcement_id: params.id,
      user_id: auth.user.id
    }).update({
      opened: 1
    });
    return view.render('app.announcements.show', {
      announcement: (await Announcement.query().where({
        id: params.id
      }).first()).toJSON()
    });
  }

}

module.exports = AnnouncementController
