'use strict'

class AdminAuthenticate {
  async handle({
    auth,
    response,
    session,
    request
  }, next) {
    if (!auth.user) {
      session.put('fromURL', request.url())
      return response.route('admin.signin')
    }
    await next()
  }
}

module.exports = AdminAuthenticate
