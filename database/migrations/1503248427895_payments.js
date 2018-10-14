'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class PaymentsSchema extends Schema {
  up() {
    this.create('payments', (table) => {
      table.increments()
      table.integer('user_id').unsigned().references('id').inTable('users')
      table.integer('package_id').unsigned().references('id').inTable('packages')
      table.boolean('status')
      table.integer('amount')
      table.timestamps()
    })
  }

  down() {
    this.drop('payments')
  }
}

module.exports = PaymentsSchema
