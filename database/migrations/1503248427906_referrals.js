'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ReferralsSchema extends Schema {

  up() {
    this.create('referrals', (table) => {
      table.increments()
      table.integer('user_id')
      table.integer('referred_by')
      table.integer('amount').defaultTo(0)
      table.boolean('status').defaultTo(false)
      table.timestamps()
    })
  }

  down() {
    this.drop('referrals')
  }

}

module.exports = ReferralsSchema
