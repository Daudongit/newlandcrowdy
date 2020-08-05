'use strict';
const Notification = use('App/Models/Notification');

class NotificationController {
    async destroy({ params, session, response }) {
        await Notification.query().where({id:params.id}).delete()
        session.flash({
            info: 'Notification Deleted Successfully.',
        })
        return response.route('app.dashboard')
    }
}

module.exports = NotificationController;
