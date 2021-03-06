'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class CustomersSchema extends Schema {
  up () {
    this.create('customers', (table) => {
      table.increments()
      table.string('first_name')
      table.string('last_name')
      table.string('email').unique()
      table.string('password')
      table.string('nickname').unique()
      table.timestamps()
    })
  }

  down () {
    this.drop('customers')
  }
}

module.exports = CustomersSchema
