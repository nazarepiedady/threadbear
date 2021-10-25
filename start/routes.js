'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URL's and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

Route.get('/', ({ view }) => {
  return view.render('page/home')
})


// register routes
Route.get('/register', ({ view }) => {
  // show registration form
  return view.render('user/register')
})

Route.post('/register', ({ request, response }) => {
  // create new customer profile
  response.safeHeader('content-type', 'application/json')
  response.send(JSON.stringify(request.all()))
})


// login routes
Route.get('/login', ({ view }) => {
  // show login form
  return view.render('user/login')
})

Route.post('/login', () => {
  // create new customer session
  return 'POST /login'
})


// logout routes
Route.put('/logout', () => {
  // expire current customer session
  return 'PUT /logout'
})


// forgot-password routes
Route.get('/forgot-password', () => {
  // show forgot password form
  return 'GET /forgot-password'
})

Route.post('/forgot-password', () => {
  // create new password reset token and send e-mail
  return 'POST /forgot-password'
})


// reset-password routes
Route.get('/reset-password/:token', ({ params }) => {
  // show forgot password form
  return 'GET /reset-password ' + params.token
})

Route.patch('/reset-password/:token', ({ request, params }) => {
  // create new password reset token and send e-mail
  //return 'POST /reset-password ' + params.token
  return JSON.stringify(request.all())
})


// customer routes
Route.get('/:customer', ({ response, view, params }) => {
  // show customer profile
  //return 'GET /:customer ' + params.customer
  response.send(view.render('user/profile', {
    name: params.customer
  }))
  return JSON.stringify(Object.keys(response))
})

Route.put('/:customer', ({ params }) => {
  // update customer profile
  return 'PUT /:customer ' + params.customer
})

Route.delete('/:customer', ({ params }) => {
  // delete customer profile
  return 'DELETE /:customer ' + params.customer
})


// customer products routes
Route.get('/:customer/products', ({ params }) => {
  // show customer's products
  return 'GET /:customer/products ' + params.customer
})

Route.post('/:customer/products', ({ params }) => {
  // create a new product
  return 'POST /:customer/products ' + params.customer
})


// customer product routes
Route.get('/:customer/:product', ({ params }) => {
  // show customer product profile
  return (
    'GET /:customer/:product ' +
    params.customer +
    ' ' +
    params.product
  )
})

Route.put('/:customer/:product', ({ params }) => {
  // update customer product profile
  return (
    'PUT /:customer/:product ' +
    params.customer +
    ' ' +
    params.product
  )
})

Route.delete('/:customer/:product', ({ params }) => {
  // delete customer product profile
  return (
    'DELETE /:customer/:product ' +
    params.customer +
    ' ' +
    params.product
  )
})
