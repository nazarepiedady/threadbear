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

async function getIdsFromTable(table) {
  const rawIds = await Database.select('id')
    .from(table)
    .orderBy('id', 'asc')
    //.map(next => next.id)
  const formatedIds = Array.from(rawIds).map(next => next.id)
  return formatedIds
}

class DatabaseSeeder {
  /*
  async ids(table) {
    return await Database.select('id')
      .from(table)
      //.orderBy('id', 'asc')
      //.map(next => next.id)
  }
  */

  async run() {
    const timestamps = {
      created_at: moment().format('YYYY-MM-DD HH:mm:ss'),
      updated_at: moment().format('YYYY-MM-DD HH:mm:ss')
    }

    // insert redirects
    await Database.insert([
      {
        from: 'assertchris',
        to: 'christopher',
        ...timestamps
      },
      {
        from: 'thetutlage',
        to: 'harminder',
        ...timestamps
      }
    ]).into('redirects')


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

    const customerIds = await getIdsFromTable('customers') // this.ids('customers')
    console.log(customerIds, typeof customerIds)

    // insert products
    await Database.insert([
      {
        name: 'Soft Teddy',
        price: 499,
        customer_id: customerIds[0],
        ...timestamps
      }
    ]).into('products')

    const productsIds = await getIdsFromTable('products') //this.ids('products')

    await Database.insert([
      {
        buyer_id: customerIds[0],
        seller_id: customerIds[1],
        status: 'pending',
        ...timestamps
      }
    ]).into('orders')

    const orderIds = await getIdsFromTable('orders') //this.ids('orders')

    await Database.insert([
      {
        order_id: orderIds[0],
        product_id: productsIds[0],
        quantity: 2,
        price: 499,
        ...timestamps
      }
    ]).into('order_items')
  }
}

module.exports = DatabaseSeeder
