'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class DepositsSchema extends Schema {
  up() {
    this.create('deposits', (table) => {
      table.increments()
      table.integer('user_id').unsigned().references('id').inTable('users')
      table.integer('package_id').unsigned().references('id').inTable('packages')
      table.string('platform')
      table.boolean('status')
      table.datetime('approved')
      table.integer('amount')
      table.string('reference')
      table.string('reason')
      table.string('file')
      table.timestamps()
    })
  }

  down() {
    this.drop('deposits')
  }
}

module.exports = DepositsSchema
