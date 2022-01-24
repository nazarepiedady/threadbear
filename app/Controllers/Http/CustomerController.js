'use strict'

const redirects = {
  assertchris: 'christopher',
  thetutlage: 'harminder',
}

class CustomerController {
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

  register({ request, response }) {
    // ...create new customer profile
    response.json(request.all())
  }

  showForgotPassword({ view }) {
    return view.render('customer/forgot-password')
  }

  forgotPassword({ request }) {
    // create new password reset token and send e-mail
    return JSON.stringify(request.all())
  }

  showResetPassword({ view, params }) {
    return view.render('customer/reset-password', { token: params.token })
  }

  resetPassword({ request }) {
    // create new password reset token and send e-mail
    return JSON.stringify(request.all())
  }

  showProfile({ params, response, view }) {
    const redirect = redirects[params.customer]

    if (redirect) return response.route('profile', { customer: redirect })

    response.send(view.render('customer/profile', { name: params.customer }))
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