'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class SupportTypesSchema extends Schema {
  up() {
    this.create('support_types', (table) => {
      table.increments()
      table.string('name')
      table.timestamps()
    })
  }

  down() {
    this.drop('support_types')
  }
  
}

module.exports = SupportTypesSchema
