'use strict'

class Guest {
  async handle({
    response,
    auth
  }, next) {
    if (auth.user) {
      return response.route('app.dashboard')
    }
    await next()
  }
}

module.exports = Guest
