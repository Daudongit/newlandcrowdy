'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class TestimonialsSchema extends Schema {
  up() {
    this.create('testimonials', (table) => {
      table.increments()
      table.string('name')
      table.string('role')
      table.text('message')
      table.timestamps()
    })
  }

  down() {
    this.drop('testimonials')
  }
  
}

module.exports = TestimonialsSchema
