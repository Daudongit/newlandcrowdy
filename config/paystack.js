'use strict'

const Env = use('Env')

module.exports = {
  secret: Env.get('PAYSTACK_SECRET'),
}
