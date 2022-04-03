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

    const rules = {
      email: 'required|email|exists:customers,email',
      password: 'required'
    }

    if (!await this.validate({ request, response, session, rules })) {
      return
    }

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

  async register({ request, response, session }) {
    // ...create new customer profile

    const rules = {
      first_name: 'required',
      last_name: 'required',
      email: 'required|email|unique|customers,email',
      password: 'required',
      confirm_password: 'required|same:password',
      nickname: 'required'
    }

    const messages = {
      'first_name.required': 'You must provide a first name',
      'last_name.required': 'You must provide a last name',
      'email.required': 'You must provide an email address',
      'email.unique': 'Your email must be unique',
      'password.required': 'You must provide a password',
      'confirm_password.required': 'You must confirm the password',
      'confirm_password.same': 'Passwords must match',
      'nickname.required': 'You must provide a nickname'
    }

    if (!await this.validate(
        request, response, session, rules, messages )) {
      return
    }

    const customer = await Customer.create(
      request.only([
        'first_name',
        'last_name',
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
