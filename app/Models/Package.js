'use strict';
const _ = require('lodash');

const moment = require('moment');
const Model = use('Model');
const Notification = use('App/Models/Notification');
const Project = use('App/Models/Project');

class Package extends Model {
  static boot() {
    super.boot();

    /**
     * A hook to hash the user password before saving
     * it to the database.
     */
    this.addHook('afterFetch', async packages => {

    })
  }
  
  getNextInterestDays({ started, status, last_process }) {
    if (status === 1) {
      const _last_process = last_process ? last_process : started;
      const end = moment(_last_process);
      const start = moment();
      return 365 - (Math.floor(moment.duration(start.diff(end)).asDays()) % 30);
    }
    return 'N/A';
  }

  static getEnums() {
    return [
      {
        field: 'status',
        id: 0,
        label: 'Un Approved',
        class: 'warning',
        background:'#F77B01',
      },
      {
        field: 'status',
        id: 1,
        label: 'Running',
        class: 'success',
        background:'#01A04B',
      },
      {
        field: 'status',
        id: 2,
        label: 'Ended',
        class: 'primary',
        background:'',
      },
      {
        field: 'status',
        id: 3,
        label: 'Paused',
        class: 'danger',
        background:'',
      },
    ];
  }

  static get computed() {
    return ['fullStatus', 'nextInterestDays'];
  }

  getFullStatus({ status }) {
    return _.find(Package.getEnums(), { field: 'status', id: status });
  }

  user() {
    return this.belongsTo('App/Models/User');
  }

  project() {
    return this.belongsTo('App/Models/Project');
  }

  payments() {
    return this.hasMany('App/Models/Payment');
  }

  async notify(user_id){
    let lastNotification = await Notification.query()
      .where({package_id:this.id}).orderBy('id', 'desc').first()
    
    if(lastNotification){
      lastNotification = lastNotification.toJSON()
      const nextNotificationDou = Math.floor(
        moment.duration(
          moment().diff(moment(lastNotification.created_at))
        ).asDays()
      )
      
      const project = (await this.project().first()).toJSON()
      if(nextNotificationDou >= 30 && !this.is_fully_pay){
        Notification.create({
          message:`your monthly payment is due for ${project.fullName} project`,
          package_id:this.id,
          user_id,
        })
      }
    }
  }
}

module.exports = Package;
