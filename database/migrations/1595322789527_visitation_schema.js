'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class VisitationSchema extends Schema {
  up () {
    this.create('visitations', (table) => {
      table.increments()
      table.string('subject')
      table.text('message')
      table.integer('project_id')
      table.integer('user_id')
      table.timestamps()
    })
  }

  down () {
    this.drop('visitations')
  }
}

module.exports = VisitationSchema
