'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ProjectsSchema extends Schema {
  up () {
    this.create('projects', (table) => {
      table.increments()
      table.string('name').notNullable()
      table.integer('duration').notNullable()
      table.integer('interest').notNullable()
      table.integer('capital').notNullable()
      table.boolean('active').defaultTo(true)
      table.timestamps()
    })
  }

  down () {
    this.drop('projects')
  }
}

module.exports = ProjectsSchema
