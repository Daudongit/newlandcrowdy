'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class AnnouncementsSchema extends Schema {
  up() {
    this.create('announcements', (table) => {
      table.increments()
      table.string('title')
      table.text('message')
      table.timestamps()
    })
  }

  down() {
    this.drop('announcements')
  }
}

module.exports = AnnouncementsSchema
