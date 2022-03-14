'use strict'


const Database = use('Database')
const Controller = use('App/Controllers/Http/Controller')

const redirects = {
  assertchris: 'christopher',
  thetutlage: 'harminder',
}

class CustomerController extends Controller {
  showLogin({ view }) {
    return view.render('customer/login')
  }

  login() {
    // create new customer session
    return 'POST /login'
  }

  logout() {
    // expire current customer session
    return 'PUT /logout'
  }

  showRegister({ view }) {
    return view.render('customer/register')
  }

  register(context) {
    // ...create new customer profile
    this.showRequestParameters(context)
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
    const rows = await Database.select('from', 'to').from('redirects')

    const redirects = rows.reduce((accumulator, row) => {
      accumulator[row.from] = row.to
      return accumulator
    }, {})

    const redirect = redirects[params.customer]

    if (redirect) return response.route('profile', { customer: redirect })

    const customer = await Database.select('*')
      .from('customer')
      .where('nickname', params.customer)
      .first()

    if (!customer) return view.render('oops', { type: 'PROFILE_MISSING' })

    return view.render('customer/profile', { name: params.customer })
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
