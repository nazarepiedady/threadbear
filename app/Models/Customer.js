'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Hash = use('Hash')
const Base = use('App/Models/Base')
const { ValidationException } = use('@adonisjs/validator/src/Exceptions')

class Customer extends Base {

  products() {
    return this.hasMany('App/Models/Product')
  }

  pendingOrders() {
    return this.hasMany('App/Models/Order', 'id', 'seller_id')
               .where('status', 'pending')
  }

  completeOrders() {
    return this.hasMany('App/Models/Order', 'id', 'seller_id')
               .where('status', 'complete')
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

    throw ValidationException.validationFailed({ email: 'invalid credentials' })
  }
}

module.exports = Customer
