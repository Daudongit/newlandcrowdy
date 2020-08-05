'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class AddPaymentModeToPackageSchema extends Schema {
  up () {
    this.table('packages', (table) => {
      table.string('payment_mode').defaultTo('')
      table.boolean('is_fully_pay').defaultTo(false)
    })
  }

  down () {
    this.table('packages', (table) => {
      table.dropColumn('payment_mode')
      table.dropColumn('is_fully_pay')
    })
  }
}

module.exports = AddPaymentModeToPackageSchema
