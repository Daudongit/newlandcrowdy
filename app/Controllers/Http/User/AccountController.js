'use strict';

const Hash = use('Hash');
const User = use('App/Models/User');
const BankDetail = use('App/Models/BankDetail');
const Bank = use('App/Models/Bank');
const uuidv4 = require('uuid/v4');
const Helpers = use('Helpers');

const { validateAll } = use('Validator');
const validationMessages = use('App/Helpers/ValidationMessages');

async function asyncForEach(array, callback) {
  for (let index = 0; index < array.length; index++) {
    await callback(array[index], index, array);
  }
}

class AccountController {
  async getAccountSettings({ view, auth }) {
    return view.render('app.account.settings', {
      bankDetails: await BankDetail.query()
        .where({
          user_id: auth.user.id,
        })
        .first(),
      profile: await User.query()
        .where({
          id: auth.user.id,
        })
        .first(),
      banks: await Bank.query().get(),
    });
  }

  async updatePassword({ request, response, session, auth }) {
    const validationRules = {
      old_password: 'required',
      new_password: 'required',
      re_new_password: 'required',
    };

    const validation = await validateAll(request.all(), validationRules, validationMessages);

    if (validation.fails()) {
      session.withErrors(validation.messages());
      return response.redirect('back');
    }

    if (request.input('new_password') !== request.input('re_new_password')) {
      session.flash({
        error: `Password not the same.`,
      });
      return response.redirect('back');
    }

    if (!(await Hash.verify(request.input('old_password'), auth.user.password))) {
      session.flash({
        error: `Invalid Password.`,
      });
      return response.redirect('back');
    }

    User.query()
      .where({
        id: auth.user.id,
      })
      .update({
        password: await Hash.make(request.input('new_password')),
      })
      .then(() => {});

    session.flash({
      info: `Password Updated Successfully.`,
    });

    return response.redirect('back');
  }

  async updateBankDetails({ request, response, session, auth }) {
    const validationRules = {
      bank_name: 'required',
      account_number: 'required',
      account_name: 'required',
    };

    const validation = await validateAll(request.all(), validationRules, validationMessages);

    if (validation.fails()) {
      session.withErrors(validation.messages());
      return response.redirect('back');
    }

    const updateData = request.only(['bank_name', 'account_number', 'account_name']);

    const bankDetailsCount = (
      await BankDetail.query()
        .where({ user_id: auth.user.id })
        .count('* as count')
    )[0].count;

    if (bankDetailsCount == 1) {
      BankDetail.query()
        .where({
          user_id: auth.user.id,
        })
        .update(updateData)
        .then(() => {});
    } else {
      BankDetail.create({
        ...updateData,
        user_id: auth.user.id,
      }).then(() => {});
    }

    session.flash({
      info: 'Bank Details Updated Successfully.',
    });
    return response.redirect('back');
  }

  async updateProfile({ request, response, session, auth }) {
    const validationRules = {
      last_name: 'required',
      first_name: 'required',
      phone_number: 'required',
    };

    const validation = await validateAll(request.all(), validationRules, validationMessages);

    if (validation.fails()) {
      session.withErrors(validation.messages());
      return response.redirect('back');
    }

    const updateData = request.only(['last_name', 'first_name', 'phone_number']);

    // const fileFields = ['valid_id', 'passport'];

    // if (fileFields.length > 0) {

    //   await asyncForEach(fileFields, async fileFieldName => {

    //     const fileField = request.file(fileFieldName)

    //     if(fileField.size === 0){
    //       return false;
    //     }

    //     if (fileField.type != 'image') {
    //       session.flash({
    //         error: "Only Images Are Allowed",
    //       });
    //       return response.redirect('back');
    //     }

    //     if (fileField.size > 1000000) {
    //       session.flash({
    //         error: "Image size too large. Maximum size is 1MB",
    //       });
    //       return response.redirect('back');
    //     }

    //     const fullPath = 'uploads/' + fileFieldName + '/' + uuidv4() + '.jpg';

    //    await fileField.move(Helpers.publicPath(), {
    //       name: fullPath
    //     });

    //     if (!fileField.moved()) {
    //       return fileField.error()
    //     }

    //     updateData[fileFieldName] = '/' + fullPath;

    //   });

    // }

    User.query()
      .where({
        id: auth.user.id,
      })
      .update(updateData)
      .then(() => {});

    session.flash({
      info: 'Profile Updated Successfully.',
    });

    return response.redirect('back');
  }
}

module.exports = AccountController;
