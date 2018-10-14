'use strict'
const _ = require('lodash');

const Model = use('Model')

class UserAnnouncement extends Model {
  static get computed() {
    return ['fullOpened']
  }

  static getEnums() {
    return [
      {
        field: 'opened',
        id: 0,
        label: "Not Opened",
        class: 'warning',
      },
      {
        field: 'opened',
        id: 1,
        label: "Opened",
        class: 'success',
      }
    ]
  }

  getFullOpened({
    opened
  }) {
    return _.find(UserAnnouncement.getEnums(), {field: 'opened', id: opened})
  }

  announcement() {
    return this.belongsTo('App/Models/Announcement')
  }

}

module.exports = UserAnnouncement
