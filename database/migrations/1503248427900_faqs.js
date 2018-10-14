'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class FaqsSchema extends Schema {
  up() {
    this.create('faqs', (table) => {
      table.increments()
      table.string('question')
      table.text('answer')
      table.timestamps()
    })
  }

  down() {
    this.drop('faqs')
  }
  
}

module.exports = FaqsSchema
