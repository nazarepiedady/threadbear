'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')
const startCase = use('lodash/startCase')

class Base extends Model {
  titleCase(...params) {
    return startCase(...params)
  }
}

module.exports = Base
