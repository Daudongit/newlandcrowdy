'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class MigrationSchema extends Schema {
  up () {
    this.alter('projects', (table) => {
      table.string('flats').notNullable();
      table.integer('slots').notNullable();
    })
  }
}

module.exports = MigrationSchema
