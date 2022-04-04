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
const Hash = use('Hash')


class DatabaseSeeder {
  async run() {
    const created_at = Database.raw('CURRENT_TIME')

    // insert redirects
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


    // insert customers
    await Database.insert({
      first_name: 'Harminder',
      last_name: 'Virk',
      email: 'virk.officials@gmail.com',
      password: await Hash.make('harminder123'),
      nickname: 'harminder',
      created_at
    }).into('customers')

    const ids = await Database.insert({
      first_name: 'Christopher',
      last_name: 'Pitt',
      email: 'cgpitt@gmail.com',
      password: await Hash.make('christopher123'),
      nickname: 'christopher',
      created_at
    }).into('customers')


    // insert products
    await Database.insert({
      name: 'Soft Teddy',
      price: 499,
      customer_id: ids[0],
      created_at
    }).into('products')
  }
}

module.exports = DatabaseSeeder
