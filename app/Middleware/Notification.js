'use strict'

class Notification {

    async handle ({ view, auth}, next) {
        const Notification = use('App/Models/Notification');
        const notifications = (await Notification.query()
            .where({user_id:auth.user.id,is_read:false})
            .orderBy('id', 'desc').fetch()
        ).toJSON()
        view.share({notificationItems:()=> notifications})
    
        await next()
    }
}

module.exports = Notification