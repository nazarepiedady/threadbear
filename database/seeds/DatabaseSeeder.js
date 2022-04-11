'use strict'


/*
|-----------------------------------------------------
| DatabaseSeeder
|-----------------------------------------------------
|
|
|
*/

const Hash = use('Hash')
const moment = use('moment')
const Factory = use('Factory')
const Database = use('Database')


class DatabaseSeeder {
  async run() {
    const timestamps = {
      created_at: moment().format('YYYY-MM-DD HH:mm:ss'),
      updated_at: moment().format('YYYY-MM-DD HH:mm:ss')
    }

    // insert redirects
    await Database.insert({
      from: 'assertchris',
      to: 'christopher',
      ...timestamps
    }).into('redirects')

    await Database.insert({
      from: 'thetutlage',
      to: 'harminder',
      ...timestamps
    }).into('redirects')


    // insert customers
    await Database.insert([
      {
        first_name: 'Harminder',
        last_name: 'Virk',
        email: 'virk.officials@gmail.com',
        password: await Hash.make('harminder123'),
        nickname: 'harminder',
        ...timestamps
      },
      {
        first_name: 'Christopher',
        last_name: 'Pitt',
        email: 'cgpitt@gmail.com',
        password: await Hash.make('christopher123'),
        nickname: 'christopher',
        ...timestamps
      }
    ]).into('customers')

    const customerIds = await this.ids('customers')

    // insert products
    await Database.insert({
      name: 'Soft Teddy',
      price: 499,
      customer_id: ids[0],
      ...timestamps
    }).into('products')

    const productsIds = await this.ids('products')

    await Database.insert([{
      buyer_id: customerIds[0],
      seller_id: customerIds[1],
      status: 'pending',
      ...timestamps
    }]).into('orders')

    const orderIds = await this.ids('orders')

    await Database.insert([{
      order_id: orderIds[0],
      product_id: productsIds[0],
      quantity: 2,
      price: 499,
      ...timestamps
    }]).into('order_items')
  }

  async ids(table) {
    return await Database.select('id')
      .from(table)
      .orderBy('id', 'asc')
      .map(next => next.id)
  }
}

module.exports = DatabaseSeeder
