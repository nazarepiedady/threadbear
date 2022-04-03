'use strict'

const { validateAll } = use('Validator')

class Controller {
  showRequestParameters({ request, response }) {
    response.json(request.all())
  }

  async validate({ request, response, session, rules }) {
    const validation = await validateAll(request.all(), rules, messages)

    if (validation.fails()) {
      session
        .withErrors(validation.messages())
        .flashAll()
      return response.redirect('back')
    }
  }
}

module.exports = Controller
