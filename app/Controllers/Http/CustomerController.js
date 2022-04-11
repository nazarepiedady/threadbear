'use strict'

const Hash = use('Hash')
const Database = use('Database')
const { validate } = use('Validator')

const Product = use('App/Models/Product')
const Customer = use('App/Models/Customer')
const Redirect = use('App/Models/Redirect')

const Controller = use('App/Controllers/Http/Controller')

const ProfileMissingException = use('App/Exceptions/ProfileMissingException')


class CustomerController extends Controller {
  showLogin({ view }) {
    return view.render('customer/login')
  }

  async login({ request, response, session }) {
    // create new customer session

    const rules = {
      email: 'required|email|exists:customers,email',
      password: 'required'
    }

    await this.validate(request, rules)

    const email = request.input('email')
    const password = request.input('password')

    const customer = await Customer.authenticate(email, password)

    session.put('customer', customer.id)
    await session.commit()

    return response.route('dashboard')
  }

  async logout({ session, response }) {
    // expire current customer session
    session.forget('customer')
    await session.commit()

    return response.route('login')
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

    await this.validate(request, rules, messages)

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

    if (!customer) throw new ProfileMissingException()

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

  async dashboard({ request, response, session, view }) {
    const customerId = session.get('customer')

    if (!customerId) {
      return response.route('login')
    }

    const customer = await Customer.find(customerId)
    const products = await customer.products().fetch()

    const pendingOrders = await customer
      .pendingOrders()
      .with('buyer')
      .with('items.product')
      .fetch()

    const completeOrders = await customer
      .completeOrders()
      .with('buyer')
      .with('items.product')
      .fetch()

    return view.render('customer/dashboard', {
      customer: customer.toJSON(),
      products: products.toJSON(),
      pendingOrders: pendingOrders.toJSON(),
      completeOrders: completeOrders.toJSON()
    })
  }
}

module.exports = CustomerController
