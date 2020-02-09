'use strict';

class AppAuthenticate {
  async handle({ response, request, auth, session }, next) {
    if (!auth.user) {
      session.flash({
        info: 'Please sigin to view page.',
      });
      session.put('fromURL', request.url());
      return response.route('app.signin');
    }
    await next();
  }
}

module.exports = AppAuthenticate;
