'use strict'
const Route = use('Route')

function generateResource(route, controller, as) {
  Route.get(`/${route}`, `${controller}.index`).as(`${as}.index`)
  Route.get(`/${route}/create`, `${controller}.create`).as(`${as}.create`)
  Route.post(`/${route}`, `${controller}.store`).as(`${as}.store`)
  Route.get(`/${route}/:id`, `${controller}.show`).as(`${as}.show`)
  Route.get(`/${route}/:id/edit`, `${controller}.edit`).as(`${as}.edit`)
  Route.put(`/${route}/:id`, `${controller}.update`).as(`${as}.update`)
  Route.delete(`/${route}/:id`, `${controller}.destroy`).as(`${as}.destroy`)
  Route.get(`/${route}/filter/:field/:id`, `${controller}.index`).as(`${as}.filter`)
  Route.get(`/${route}/sort/:sort/:order`, `${controller}.index`).as(`${as}.sort`)
}

Route
  .get('/', 'HomeController.getIndex')
  .as('index')
  .middleware(['guest']);

Route
  .group(() => {
    Route.get('/', 'HomeController.getDashboard').as('admin.dashboard')

    generateResource('deposits', 'DepositController', 'admin.deposits')
    generateResource('plans', 'PlansController', 'admin.plans')
    generateResource('packages', 'PackagesController', 'admin.packages')
    generateResource('supporttypes', 'SupportTypesController', 'admin.supporttypes')
    generateResource('faqs', 'FaqController', 'admin.faqs')
    generateResource('banks', 'BankController', 'admin.banks')
    generateResource('bankoptions', 'BankOptionController', 'admin.bankoptions')
    generateResource('withdrawals', 'WithdrawalController', 'admin.withdrawals') // Notification
    
    Route.get('/transactions', 'TransactionController.index').as('admin.transactions.index')
    Route.get('/transactions/filter/:field/:id', 'TransactionController.index').as(`admin.transactions.filter`)

    Route.get('/transactions/from/:from/:id', 'TransactionController.from').as(`admin.transactions.from`)

    Route.get('/supports', 'SupportController.index').as('admin.supports.index')
    Route.get('/supports/:id/edit', 'SupportController.edit').as('admin.supports.edit')
    Route.put('/supports/:id', 'SupportController.update').as('admin.supports.update');

    Route.get('/announcements', 'AnnouncementController.index').as('admin.announcements.index')
    Route.get('/announcements/create', 'AnnouncementController.create').as('admin.announcements.create')
    Route.post('/announcements', 'AnnouncementController.store').as('admin.announcements.store');
    
    Route.get('/references', 'ReferencesController.index').as('admin.references.index')
    Route.get('/references/:id/edit', 'ReferencesController.edit').as('admin.references.edit')
    Route.put('/references/:id', 'ReferencesController.update').as('admin.references.update')

    Route.put('/user/wallet/:id', 'UserController.wallet').as('admin.user.wallet')

    // Done

    generateResource('users', 'UserController', 'admin.users')

  })
  .prefix('admin')
  .namespace('Admin')
  .middleware(['auth.admin', 'is.admin']);

Route
  .group(() => {

    Route.get('/', 'HomeController.getDashboard').as('app.dashboard')

    Route.get('/packages', 'PackagesController.index').as('app.packages.index')
    Route.get('/packages/choose', 'PackagesController.choose').as('app.packages.choose')
    Route.get('/packages/invoice/:id', 'PackagesController.invoice').as('app.packages.invoice')
    Route.get('/packages/choose/payment/:id', 'PackagesController.choosePayment').as('app.packages.choose.payment')
    Route.get('/packages/:id', 'PackagesController.show').as('app.packages.show')
    Route.post('/packages', 'PackagesController.store').as('app.packages.store')
    Route.get('/packages/evidence/:id', 'PackagesController.getEvidence').as('app.packages.evidence')
    Route.post('/packages/evidence/:id', 'PackagesController.doEvidence').as('app.packages.evidence')
    Route.get('/packages/payments/:id', 'PackagesController.payments').as('app.packages.payments')
    
    Route.get('/transactions', 'TransactionController.index').as('app.transactions.index')
    Route.get('/transactions/filter/:field/:id', 'TransactionController.index').as('app.transactions.filter')
    Route.get(`/transactions/sort/:sort/:order`, `TransactionController.index`).as(`app.transactions.sort`)
    Route.get('/transactions/from/:from/:id', 'TransactionController.from').as('app.transactions.from')

    Route.get('/announcements', 'AnnouncementController.index').as('app.announcements.index')
    Route.get('/announcements/:id', 'AnnouncementController.show').as('app.announcements.show')

    Route.get('/supports', 'SupportController.index').as('app.supports.index')
    Route.get('/supports/create', 'SupportController.create').as('app.supports.create')
    Route.post('/supports', 'SupportController.store').as('app.supports.store');
    Route.get('/supports/:id', 'SupportController.show').as('app.supports.show')

    Route.get('/faqs', 'FaqController.index').as('app.faqs.index')

    Route.get('/account/settings', 'AccountController.getAccountSettings').as('app.account.settings')
    Route.put('/account/password', 'AccountController.updatePassword').as('app.account.password')
    Route.put('/account/bank_details', 'AccountController.updateBankDetails').as('app.account.bankDetails')
    Route.put('/account/profile', 'AccountController.updateProfile').as('app.account.profile')

    Route.get('/withdrawals', 'WithdrawalController.index').as('app.withdrawals.index')
    Route.get('/withdrawals/create', 'WithdrawalController.create').as('app.withdrawals.create')
    Route.post('/withdrawals', 'WithdrawalController.store').as('app.withdrawals.store')


  })
  .prefix('app')
  .namespace('User/')
  .middleware(['auth.app', 'is.user']);

Route
  .get('/payment/notify', 'User/PackagesController.paymentNotify')

Route
  .group(() => {
    Route.get('/messages', 'MessageController.index').as('app.messages.index')
    Route.post('/messages/find', 'MessageController.find').as('app.messages.find')
    Route.get('/messages/:username', 'MessageController.show').as('app.messages.show')
    Route.post('/messages/:username', 'MessageController.store').as('app.messages.store')
  })
  .namespace('User/')
  .middleware(['auth.app']);

Route
  .get('/app/signin', 'AuthController.getAppSignin')
  .as('app.signin')
  .middleware(['guest']);

Route
  .get('/admin/signin', 'AuthController.getAdminSignin')
  .as('admin.signin')
  .middleware(['guest']);

Route
  .post('/app/signin', 'AuthController.postAppSignin')
  .as('app.signin')
  .middleware(['guest']);

Route
  .post('/admin/signin', 'AuthController.postAdminSignin')
  .as('admin.signin')
  .middleware(['guest']);

Route
  .get('/logout', 'AuthController.logOut')
  .as('logout')
  .middleware(['auth.app']);

Route
  .get('/app/forgotpassword', 'AuthController.getForGotPassword')
  .as('app.forgotpassword')
  .middleware(['guest']);

Route
  .post('/app/forgotpassword', 'AuthController.doForGotPassword')
  .as('app.forgotpassword')
  .middleware(['guest']);


Route
  .get('/auth/activateaccount/:username/:token', 'AuthController.activateAccount')
  .as('auth.activateAccount')
  .middleware(['guest']);

Route
  .get('/app/signup', 'AuthController.getSignUp')
  .as('app.signup')
  .middleware(['guest']);

Route
  .post('/app/signup', 'AuthController.doSignUp')
  .as('app.signup')
  .middleware(['guest']);

/*
The must be the last route
*/

Route
  .get('/:referral', 'AuthController.getSignUp')
  .as('auth.referral')
  .middleware(['guest']);
