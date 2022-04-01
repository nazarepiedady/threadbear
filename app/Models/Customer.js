'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Customer extends Model {
  products() {
    return this.hasMany('App/Models/Product')
  }

  setNickname(nickname) {
    return nickname.toLowerCase()
  }
}

module.exports = Customer
