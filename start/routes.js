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
const Database = use('Database')


Route.get('/add-redirects', async () => {
  const created_at = Database.raw('CURRENT_TIME')

  await Database.insert({
    from: 'assertchris',
    to: 'christopher',
    created_at
  }).into('redirects')

  await Database.insert({
    from: 'thetutlage',
    to: 'harminder',
    created_at
  }).into('redirects')

  return 'done';
})

Route.get('/', async ({ view }) => {
  const result = await Database.raw('SELECT CURRENT_TIME as time')
  console.log('when you hear the beep, it will be ' + result[0].time)
  return view.render('page/home')
})


Route.get('/login', 'CustomerController.showLogin')


Route.post('/login', 'CustomerController.login')


Route.put('/logout', 'CustomerController.logout')


Route.get('/register', 'CustomerController.showRegister')


Route.post('/register', 'CustomerController.register')


Route.get('/forgot-password', 'CustomerController.showForgotPassword')


Route.post('/forgot-password', 'CustomerController.forgotPassword')


Route.get('/reset-password/:token', 'CustomerController.showResetPassword')


Route.patch('/reset-password/:token', 'CustomerController.resetPassword')


Route.get('/:customer', 'CustomerController.showProfile').as('profile')


Route.put('/:customer', 'CustomerController.updateProfile')


Route.delete('/:customer', 'CustomerController.deleteProfile')
