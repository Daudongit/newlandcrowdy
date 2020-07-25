'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class AddSoldStatusToProjectsSchema extends Schema {
  up () {
    this.table('projects', (table) => {
      table.integer('sold_status').defaultTo(0)
    })
    //0->Opening Soon
    //1->Now Selling
    //2->Sold Out
  }

  down () {
    this.table('projects', (table) => {
      table.dropColumn('sold_status')
    })
  }
}

module.exports = AddSoldStatusToProjectsSchema
