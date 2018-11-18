'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class MigrationSchema extends Schema {
  up () {
    this.alter('users', (table) => {
        table.string('address')
        table.string('city')
        table.string('state')
        table.string('picture')
        table.string('id_card')
    })
  }

}

module.exports = MigrationSchema
