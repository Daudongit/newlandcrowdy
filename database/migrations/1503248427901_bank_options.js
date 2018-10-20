'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class BankOptionsSchema extends Schema {
  up() {
    this.create('bank_options', (table) => {
      table.increments()
      table.string('bank_name')
      table.string('account_name')
      table.string('account_number')
      table.timestamps()
    })
  }

  down() {
    this.drop('bank_options')
  }
}

module.exports = BankOptionsSchema
