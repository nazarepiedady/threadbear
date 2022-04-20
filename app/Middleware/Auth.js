'use strict'
/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

const key = 'customer'
const redirectTo = 'login'
const Customer = use('App/Models/Customer')

class Auth {
  /**
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Function} next
   */
  async handle ({ request, session, response }, next) {
    // call next to advance the request
    const id = session.get(key)

    if (!id) {
      return response.route(redirectTo)
    }

    const customer = await Customer.find(id)

    if (!customer) {
      return response.route(redirectTo)
    }

    request.customer = customer

    await next()
  }
}

module.exports = Auth
