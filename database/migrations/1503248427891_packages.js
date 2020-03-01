'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class PackagesSchema extends Schema {
  up () {
    this.create('packages', (table) => {
      table.increments()
      table.integer('user_id').unsigned().references('id').inTable('users')
      table.integer('plan_id').unsigned().references('id').inTable('projects')
      table.boolean('status').defaultTo(false)
      table.datetime('started')
      table.timestamps()
    })
  }

  down () {
    this.drop('packages')
  }
}

module.exports = PackagesSchema
