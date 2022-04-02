'use strict'

const Hash = use('Hash')
const Database = use('Database')
const { validate } = use('Validator')

const Product = use('App/Models/Product')
const Customer = use('App/Models/Customer')
const Redirect = use('App/Models/Redirect')

const Controller = use('App/Controllers/Http/Controller')


class CustomerController extends Controller {
  showLogin({ view }) {
    return view.render('customer/login')
  }

  async login({ request, reponse }) {
    // create new customer session

    const email = request.input('email')
    const password = request.input('password')

    try {
      const customer = await Customer.authenticate(email, password)
    } catch (exception) {
      return 'invalid'
    }

    return 'valid'
  }

  logout() {
    // expire current customer session
    return 'PUT /logout'
  }

  showRegister({ view }) {
    return view.render('customer/register')
  }

  async register({ request, response }) {
    // ...create new customer profile

    const customer = await Customer.create(
      request.only([
        'first-name',
        'last-name',
        'email',
        'password',
        'nickname'
      ])
    )

    return 'done'
  }

  showForgotPassword({ view }) {
    return view.render('customer/forgot-password')
  }

  forgotPassword(context) {
    // create new password reset token and send e-mail
    this.showRequestParameters(context)
  }

  showResetPassword({ view, params }) {
    return view.render('customer/reset-password', { token: params.token })
  }

  resetPassword(context) {
    // create new password reset token and send e-mail
    this.showRequestParameters(context)
  }

  async showProfile({ params, response, view }) {

    const rows = await Redirect.all()

    const redirects = Array.from(rows).reduce(
      (accumulator, row) => {
        accumulator[row.from] = row.to
        return accumulator
      },
      {}
    )

    const redirect = redirects[params.customer]

    if (redirect) return response.route('profile', { customer: redirect })

    const customer = await Customer.query()
      .where('nickname', params.customer)
      .first()

    if (!customer) return view.render('oops', { type: 'PROFILE_MISSING' })

    const products = await customer.products()

    return view.render('customer/profile', { customer, products })
  }

  updateProfile({ params }) {
    // update customer profile
    return 'PUT /:customer ' + params.customer
  }

  deleteProfile({ params }) {
    // delete customer profile
    return 'DELETE /:customer ' + params.customer
  }
}

module.exports = CustomerController
