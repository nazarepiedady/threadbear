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

Route.get('/', ({ request }) => {
  return '...some html'
})


// register routes
Route.get('/register', () => {
  // show registration form
  return 'GET /register'
})

Route.post('/register', () => {
  // create new customer profile
  return 'POST /register'
})


// login routes
Route.get('/login', () => {
  // show login form
  return 'GET /login'
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
