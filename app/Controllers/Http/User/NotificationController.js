'use strict';
const Notification = use('App/Models/Notification');

class NotificationController {
    async update({ params, session, response }) {
        await Notification.query().where({id:params.id})
        .update({is_read:true})
        session.flash({
            info: 'Notification Deleted Successfully.',
        })
        return response.route('app.dashboard')
    }
}

module.exports = NotificationController;
