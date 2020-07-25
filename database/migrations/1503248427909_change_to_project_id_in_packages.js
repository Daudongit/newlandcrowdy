'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class MigrationSchema extends Schema {
  up () {
    this.alter('packages', (table) => {
        table.renameColumn('plan_id', 'project_id')
    })
  }

  down() {
    this.alter('packages', (table) => {
      table.renameColumn('project_id', 'plan_id')
    })
  }
}

module.exports = MigrationSchema
