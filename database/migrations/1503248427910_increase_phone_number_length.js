'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class MigrationSchema extends Schema {
  up () {
    this.alter('users', (table) => {
      table.string('phone_number', 24).notNullable().alter()
    })
  }

  down() {
    this.alter('users', (table) => {
      table.dropColumn('phone_number')
    })
  }
}

module.exports = MigrationSchema
