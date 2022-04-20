'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
//const Model = use('Model')
const Base = use('App/Models/Base')

class OrderItem extends Base {
  product() {
    return this.belongsTo('App/Models/Product')
  }
}

module.exports = OrderItem
