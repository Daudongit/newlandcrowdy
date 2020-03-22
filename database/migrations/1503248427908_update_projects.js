'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class MigrationSchema extends Schema {
  up () {
    this.alter('projects', (table) => {
        table.dropColumn('interest')
        table.integer('annum_return')
    })
  }

}

module.exports = MigrationSchema
