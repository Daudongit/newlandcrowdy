'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class CreateNotificationSchema extends Schema {
  up () {
    this.create('notifications', (table) => {
      table.increments()
      table.integer('package_id')
      table.integer('user_id')
      table.text('message')
      table.boolean('is_read').defaultTo(false)
      table.timestamps()
    })
  }

  down () {
    this.drop('notifications')
  }
}

module.exports = CreateNotificationSchema
