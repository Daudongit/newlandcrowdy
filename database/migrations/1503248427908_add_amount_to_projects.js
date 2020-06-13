'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class MigrationSchema extends Schema {
  up () {
    this.alter('packages', (table) => {
        table.integer('amount')
    })
  }

}

module.exports = MigrationSchema
