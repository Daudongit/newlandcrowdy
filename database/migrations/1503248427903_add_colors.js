'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class MigrationSchema extends Schema {
  up () {
    this.alter('plans', (table) => {
      table.string('color').notNullable()
    })
  }

}

module.exports = MigrationSchema
