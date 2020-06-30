'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class MigrationSchema extends Schema {
  up () {
    this.alter('packages', (table) => {
        table.date('last_process')
    })
  }

  down() {
    this.alter('packages', (table) => {
      table.dropColumn('last_process')
    })
  }
}

module.exports = MigrationSchema
