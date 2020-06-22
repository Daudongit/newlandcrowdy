'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class MigrationSchema extends Schema {
  up () {
    this.alter('users', (table) => {
      table.string('phone_number', 24).notNullable().alter()
    })
  }

}

module.exports = MigrationSchema
