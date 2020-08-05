'use strict';

const Model = use('Model');
const moment = require('moment');

class Notification extends Model {
    static get computed() {
        return ['createdAtFormat'];
    }

    getCreatedAtFormat({created_at}){
        return moment(created_at).fromNow()
    }
}

module.exports = Notification;
