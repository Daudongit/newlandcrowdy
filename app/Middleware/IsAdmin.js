'use strict'

class IsAdmin {
  async handle({
    response,
    auth
  }, next) {
    if (!auth.user.isAdmin()) {
      return response.route('app.dashboard')
    }
    // call next to advance the request
    await next()
  }
}

module.exports = IsAdmin
