'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class UserAnnouncementsSchema extends Schema {
  up() {
    this.create('user_announcements', (table) => {
      table.increments()
      table.integer('user_id').unsigned().references('id').inTable('users')
      table.integer('announcement_id').unsigned().references('id').inTable('announcements')
      table.boolean('opened').defaultTo(false)
      table.timestamps()
    })
  }

  down() {
    this.drop('user_announcements')
  }
  
}

module.exports = UserAnnouncementsSchema
