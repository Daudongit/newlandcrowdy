'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class SupportSchema extends Schema {
  up() {
    this.create('supports', (table) => {
      table.increments()
      table.integer('user_id').unsigned().references('id').inTable('users')
      table.integer('reply_by')
      table.text('message')
      table.text('reply')
      table.string('type')
      table.boolean('status').defaultTo(false)
      table.timestamps()
    })
  }

  down() {
    this.drop('supports')
  }
  
}

module.exports = SupportSchema
