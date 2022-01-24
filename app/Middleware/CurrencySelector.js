'use strict'
/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

// npm install --save geoip-lite
// npm install --save currency-map-country
const geoip = use('geoip-lite')
const {
  getCountry,
  getCountryByAbbreviation,
  getCurrency
} = use('current-map-country')

class CurrencySelector {
  /**
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Function} next
   */
  async handle ({ request }, next) {
    // call next to advance the request
    const ip = request.ip()
    const reference = geoip.lookup(ip)

    let currency = null

    if (!reference) {
      request.country = 'Unknown'
      request.currency = 'US'

      currency = getCurrency('USD')
    } else {
      request.country = reference.country
      const name = getCountryByAbbreviation(request.country)
      const country = getCountry(name);
      currency = getCurrency(country.cur)
    }

    request.currencyFormat = currency.symbolFormat

    await next()
  }
}

module.exports = CurrencySelector
