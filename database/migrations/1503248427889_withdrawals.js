'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class WithdrawalsSchema extends Schema {
  up () {
    this.create('withdrawals', (table) => {
      table.increments()
      table.integer('user_id').unsigned().references('id').inTable('users')
      table.integer('amount').notNullable()
      table.integer('charge').notNullable()
      table.boolean('status').defaultTo(false)
      table.timestamps()
    })
  }

  down () {
    this.drop('withdrawals')
  }
}

module.exports = WithdrawalsSchema
