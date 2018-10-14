'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class PackagesSchema extends Schema {
  up() {
    this.create('bank_details', (table) => {
      table.increments()
      table.integer('user_id').unsigned().references('id').inTable('users')
      table.string('bank_name')
      table.string('account_name')
      table.string('account_number')
      table.timestamps()
    })
  }

  down() {
    this.drop('bank_details')
  }
}

module.exports = PackagesSchema
