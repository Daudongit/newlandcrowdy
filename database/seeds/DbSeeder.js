'use strict'

/*
|--------------------------------------------------------------------------
| DbSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory')

class DbSeeder {
  async run () {
    this.setCount()
      this.testAdminLogin()
      this.testUserLogin()
      await Factory
        .model('App/Models/User')
        .createMany(this.user)
      await Factory
        .model('App/Models/Project')
        .createMany(this.project)
      await Factory
        .model('App/Models/Bank')
        .createMany(this.bank)
      await Factory
        .model('App/Models/Announcement')
        .createMany(this.announcement)
      await Factory
        .model('App/Models/SupportType')
        .createMany(this.supportType)
      await Factory
        .model('App/Models/Faq')
        .createMany(this.faq)
      await Factory
        .model('App/Models/BankOption')
        .createMany(this.bankOption)
      this.others()
  }

  setCount(){
    this.adminLoginDetail = {
      email:'admin@email.com',
      password:'secret',role:true
    },
    this.userLoginDetail = {
      email:'user@email.com',
      password:'secret',role:false
    },
    this.user = 10
    this.reference = 5
    // this.transaction = 25
    this.withdrawal = 15
    this.project = 20
    this.bank = 5
    this.package = 15
    this.bankDetail = 10
    this.deposit = 10
    this.payment = 15
    this.announcement = 17
    this.userAnnouncement = 10
    this.support = 10
    this.supportType = 5
    this.faq = 7
    this.bankOption = 12
    this.testimonial = 14
    this.referral = 13
  }

  others(){
    try {
      this.references(this.user)
      this.transactions(this.user)
      this.withdrawals(this.user)
      this.packages({
        user:this.user,project:this.project
      })
      this.bankDetails(this.user)
      this.deposits({
        user:this.user,package:this.package
      })
      this.payments({
        user:this.user,package:this.package
      })
      this.userAnnouncements({
        user:this.user,announcement:this.announcement
      })
      this.supports(this.user)
      this.testimonials(this.user)
      this.referrals(this.user)
    } catch (error) {
      console.log(error)
    }
  }

  async testAdminLogin(){
    const user = await Factory
    .model('App/Models/User')
    .create(this.adminLoginDetail)
    user.verified = '1'
    await user.save()
  }

  async testUserLogin(){
    const user = await Factory
    .model('App/Models/User')
    .create(this.userLoginDetail)
    user.verified = '1'
    await user.save()
  }

  async references(userCount){
    await Factory
      .model('App/Models/Reference')
      .create({slug:'min_investment',value:10000})
    await Factory
      .model('App/Models/Reference')
      .create({slug:'max_investment',value:5000000})
    await Factory
      .model('App/Models/Reference')
      .create({slug:'min_withdrawal',value:5000})
    await Factory
      .model('App/Models/Reference')
      .create({slug:'max_withdrawal',value:50000})
    await Factory
      .model('App/Models/Reference')
      .create({slug:'withdrawal_charges',value:1000})
    // return await Factory
    //   .model('App/Models/Reference')
    //   .createMany(
    //     this.reference,{
    //       last_updated_by:()=>Math.floor(Math.random() * userCount) + 1
    //     }
    //   )
  }

  async transactions(userCount){
    return await Factory
      .model('App/Models/Transaction')
      .createMany(
        this.transaction,{
          user_id:()=>Math.floor(Math.random() * userCount) + 1
        }
      )
  }

  async withdrawals(userCount){
    return await Factory
      .model('App/Models/Withdrawal')
      .createMany(
        this.withdrawal,{
          user_id:()=>Math.floor(Math.random() * userCount) + 1
        }
      )
  }

  async packages(info){
    return await Factory
      .model('App/Models/Package')
      .createMany(
        this.package,{
          user_id:()=>Math.floor(Math.random() * info.user) + 1,
          project_id:()=>Math.floor(Math.random() * info.project) + 1
        }
      )
  }

  async bankDetails(userCount){
    return await Factory
      .model('App/Models/BankDetail')
      .createMany(
        this.bankDetail,{
          user_id:()=>Math.floor(Math.random() * userCount) + 1
        }
      )
  }

  async deposits(info){
    return await Factory
      .model('App/Models/Deposit')
      .createMany(
        this.deposit,{
          user_id:()=>Math.floor(Math.random() * info.user) + 1,
          package_id:()=>Math.floor(Math.random() * info.package) + 1
        }
      )
  }

  async payments(info){
    return await Factory
      .model('App/Models/Payment')
      .createMany(
        this.payment,{
          user_id:()=>Math.floor(Math.random() * info.user) + 1,
          package_id:()=>Math.floor(Math.random() * info.package) + 1
        }
      )
  }

  async userAnnouncements(info){
    return await Factory
      .model('App/Models/UserAnnouncement')
      .createMany(
        this.userAnnouncement,{
          user_id:()=>Math.floor(Math.random() * info.user) + 1,
          announcement_id:()=>Math.floor(Math.random() * info.announcement) + 1
        }
      )
  }

  async supports(userCount){
    return await Factory
      .model('App/Models/Support')
      .createMany(
        this.support,{
          user_id:()=>Math.floor(Math.random() * userCount) + 1
        }
      )
  }

  async testimonials(userCount){
    return await Factory
      .model('App/Models/Testimonial')
      .createMany(
        this.testimonial,{
          user_id:()=>Math.floor(Math.random() * userCount) + 1
        }
      )
  }

  async referrals(userCount){
    return await Factory
      .model('App/Models/Referral')
      .createMany(
        this.referral,{
          user_id:()=>Math.floor(Math.random() * userCount) + 1,
          referred_by:()=>Math.floor(Math.random() * userCount) + 1
        }
      )
  }

}

module.exports = DbSeeder
