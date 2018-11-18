'use strict'

/** @type {import('@adonisjs/framework/src/Hash')} */
const Hash = use('Hash')

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class User extends Model {
  static boot () {
    super.boot()

    /**
    * A hook to hash the user password before saving
    * it to the database.
    */
    this.addHook('beforeSave', async (userInstance) => {
      if (userInstance.dirty.password) {
        userInstance.password = await Hash.make(userInstance.password)
        userInstance.verified = await Hash.make(userInstance.verified)
      }
    })
  }

  /**
  * A relationship on tokens is required for auth to
  * work. Since features like `refreshTokens` or
  * `rememberToken` will be saved inside the
  * tokens table.
  *
  * @method tokens
  *
  * @return {Object}
  */
  tokens () {
    return this.hasMany('App/Models/Token')
  }

  bankDetail () {
    return this.hasOne('App/Models/BankDetail')
  }

  isAdmin(){
    return this.role === 1;
  }

  isUser(){
    return !this.isAdmin();
  }

  static get computed() {
    return ['fullName', 'fullVerified']
  }

  getFullVerified({
    verified
  }) {
    switch (verified) {
      case "1":
      return {
        class: "success",
        label: "Verified"
      };
      break;
      default:
      return {
        class: "warning",
        label: "Unverified"
      };
      break;
    }
  }

  getFullName(){
    return `${this.first_name} ${this.last_name}`;
  }


}

module.exports = User
