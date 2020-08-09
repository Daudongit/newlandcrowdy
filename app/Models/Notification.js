'use strict';
const _ = require('lodash');

const Model = use('Model');
const moment = require('moment');

class Notification extends Model {
    static get computed() {
        return ['createdAtFormat','isReadStatus'];
    }

    getCreatedAtFormat({created_at}){
        return moment(created_at).fromNow()
    }

    getIsReadStatus({ is_read }) {
        return _.find(Notification.getIsReadEnums(), {id: is_read });
    }

    static getIsReadEnums(){
        return [
            {   
                id:0,
                label:'Not Read',
                class:'danger'
            },
            {   
                id:1,
                label:'Read',
                class:'success'
            }
        ]
    }

    user(){
        return this.belongsTo('App/Models/User');
    }

    package(){
        return this.belongsTo('App/Models/Package');
    }
}

module.exports = Notification;
