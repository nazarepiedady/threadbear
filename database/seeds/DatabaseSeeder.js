'use strict'


/*
|-----------------------------------------------------
| DatabaseSeeder
|-----------------------------------------------------
|
|
|
*/

const Factory = use('Factory')
const Database = use('Database')

class DatabaseSeeder {
  async run() {
    const created_at = Database.raw('CURRENT_TIME')

    await Database.insert({
      from: 'assertchris',
      to: 'christopher',
      created_at
    }).into('redirects')

    await Database.insert({
      from: 'thetutlage',
      to: 'harminder',
      created_at
    }).into('redirects')
  }
}

module.exports = DatabaseSeeder
