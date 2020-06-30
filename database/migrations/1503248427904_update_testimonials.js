'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class MigrationSchema extends Schema {
  up () {
    this.alter('testimonials', (table) => {
        table.integer('user_id').unsigned().references('id').inTable('users')
        table.boolean('display').defaultTo(false)
    })
  }

  down() {
    this.alter('testimonials', (table) => {
      table.dropColumn('user_id')
      table.dropColumn('display')
    })
  }
}

module.exports = MigrationSchema
