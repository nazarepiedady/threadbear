const { hooks } = require('@adonisjs/ignitor')


hooks.after.providersBooted(() => {
  const Database = use('Database')
  const Validator = use('Validator')

  const exists = async (data, field, message, args, get) => {
    const value = get(data, field)

    if (!value) {
      return
    }

    const [table, column] = args

    const row = await Database.table(table)
      .where(column, value)
      .first()

    if (!row) {
      throw message
    }
  }

  Validator.extend('exists', exists)
})
