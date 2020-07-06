'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class AddFeatureImgSchema extends Schema {
  up () {
    this.table('projects', (table) => {
      table.string('feature_img')
    })
  }

  down () {
    this.table('projects', (table) => {
      table.dropColumn('feature_img')
    })
  }
}

module.exports = AddFeatureImgSchema
