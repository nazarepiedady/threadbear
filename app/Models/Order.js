'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
//const Model = use('Model')
const Base = use('App/Models/Base')

class Order extends Base {
  items() {
    return this.hasMany('App/Models/OrderItem')
  }

  buyer() {
    return this.belongsTo('App/Models/Customer', 'buyer_id')
  }

  seller() {
    return this.belongsTo('App/Models/Customer', 'seller_id')
  }
}

module.exports = Order
