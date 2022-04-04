'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Hash = use('Hash')
const Base = use('App/Models/Base')

class Customer extends Base {

  products() {
    return this.hasMany('App/Models/Product')
  }

  setNickname(nickname) {
    return nickname.toLowerCase()
  }

  static get computed() {
    return ['displayName']
  }

  getDisplayName({ first_name, last_name }) {
    return this.titleCase(first_name + ' ' + last_name)
  }

  static boot() {
    super.boot()

    this.addHook('beforeCreate', async customer => {
      customer.password = await Hash.make(customer.password)
    })
  }

  static async authenticate(email, password) {
    const customer = await Customer.findByOrFail('emal', email)
    const matches = await Hash.verify(password, customer.password)

    if (matches) {
      return customer
    }

    throw Error('invalid credentials')
  }
}

module.exports = Customer
