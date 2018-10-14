'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ReferencesSchema extends Schema {
  up () {
    this.create('references', (table) => {
      table.increments()
      table.string('title', 255).notNullable()
      table.string('slug', 255).notNullable().unique().index()
      table.string('value').notNullable()
      table.string('type', 11)
      table.integer('last_updated_by').unsigned().references('id').inTable('users')
      table.timestamps()
    })
  }

  down () {
    this.drop('references')
  }
}

module.exports = ReferencesSchema
