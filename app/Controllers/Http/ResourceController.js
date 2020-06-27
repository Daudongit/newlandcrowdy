'use strict';
const _ = require('lodash');

const { validateAll } = use('Validator');
const validationMessages = use('App/Helpers/ValidationMessages');
const Helpers = use('Helpers');
const uuidv4 = require('uuid/v4');

async function asyncForEach(array, callback) {
  for (let index = 0; index < array.length; index++) {
    await callback(array[index], index, array);
  }
}

class ResourceController {
  constructor() {
    this.relationships = [];
    this.indexWheres = [];
    this.indexWhereNots = [];
    this.filterFields = [];
    this.whereMe = false;
    this.noAction = false;
    this.showLinks = [];
    this.searchAbles = [];
    this.fileFields = [];
    this.editText = 'Edit';
  }

  async index({ view, request, params, auth }) {
    let titlePrefix = '';
    const page = request.input('page') || 1;
    let query = this.model.query();

    if (params.sort && params.order && (params.order == 'asc' || params.order == 'desc')) {
      // if(!request.input('page')){
      //   order = 'desc';
      // }
      query = query.orderBy(params.sort, params.order);
    } else {
      query = query.orderBy('id', 'desc');
    }

    if (params.field && params.id) {
      titlePrefix = params.field === 'user' ? 'User ' : _.find(this.filterFields, params).title;
      const field = params.field === 'user' ? 'user_id' : params.field;
      query = query.where(field, params.id);
    }

    if (request.input('search')) {
      titlePrefix = 'Search ';
      this.searchAbles.forEach(searchAble => {
        query = query.orWhere(searchAble, 'LIKE', '%' + request.input('search') + '%');
      });
    }

    if (this.whereMe) {
      query = query.where({
        user_id: auth.user.id,
      });
    }

    this.indexWheres.forEach(indexWhere => {
      query = query.where(indexWhere);
    });
    this.indexWhereNots.forEach(indexWhere => {
      query = query.whereNot(indexWhere);
    });
    this.relationships.forEach(relationship => {
      query = query.with(relationship);
    });

    const resourceData = (await query.paginate(page)).toJSON();
    return view.render('crud.index', {
      resourceData,
      resourceRoute: this.resourceRoute,
      mutipleItems: `${titlePrefix} ${this.mutipleItems}`,
      singleItem: this.singleItem,
      hasCreate: this.hasCreate,
      indexAbles: this.indexAbles,
      hasShow: this.hasShow,
      hasEdit: this.hasEdit,
      hasDelete: this.hasDelete,
      filterFields: this.filterFields,
      noAction: this.noAction,
      searchAbles: this.searchAbles.length,
      editText: this.editText,
    });
  }

  async create({ view }) {
    return view.render('crud.create', {
      resourceRoute: this.resourceRoute,
      mutipleItems: this.mutipleItems,
      singleItem: this.singleItem,
      createAbles: this.createAbles,
    });
  }

  async store({ request, response, session }) {
    const validation = await validateAll(request.all(), this.validationRules, validationMessages);

    if (validation.fails()) {
      session.withErrors(validation.messages()).flashExcept();
      return response.redirect('back');
    }

    const createData = request.only(this.dataFields);

    if (this.fileFields.length > 0) {
      await asyncForEach(this.fileFields, async fileFieldName => {
        const fileField = request.file(fileFieldName);

        if (fileField.type != 'image') {
          session.flash({
            error: 'Only Images Are Allowed',
          });
          return response.redirect('back');
        }

        if (fileField.size > 1000000) {
          session.flash({
            error: 'Image size too large. Maximum size is 1MB',
          });
          return response.redirect('back');
        }

        const dirPath = this.resourceRoute.replace('admin.', '');

        const fullPath = 'uploads/' + dirPath + '/' + uuidv4() + '.jpg';

        await fileField.move(Helpers.publicPath(), {
          name: fullPath,
        });

        if (!fileField.moved()) {
          return fileField.error();
        }
        createData[fileFieldName] = '/' + fullPath;
      });
    }

    this.model.create(createData);
    session.flash({
      info: `${this.singleItem} Created Successfully.`,
    });
    return response.route(this.indexRoute);
  }

  async show({ view, params }) {
    let query = this.model.query().where({
      id: params.id,
    });
    this.relationships.forEach(relationship => {
      query = query.with(relationship);
    });
    const resourceDatum = (await query.first()).toJSON();

    return view.render('crud.show', {
      resourceDatum,
      resourceRoute: this.resourceRoute,
      singleItem: this.singleItem,
      hasEdit: this.hasEdit,
      hasDelete: this.hasDelete,
      showAbles: this.showAbles,
      showLinks: this.showLinks,
    });
  }

  async edit({ view, params }) {
    return view.render('crud.edit', {
      resourceDatum: await this.model
        .query()
        .where({
          id: params.id,
        })
        .first(),
      resourceRoute: this.resourceRoute,
      singleItem: this.singleItem,
      editAbles: this.editAbles,
      editText: this.editText,
    });
  }

  async update({ request, response, session, params }) {
    const validation = await validateAll(request.all(), this.validationRules, validationMessages);

    if (validation.fails()) {
      session.withErrors(validation.messages());
      return response.redirect('back');
    }

    const updateData = request.only(this.dataFields);
    this.model
      .query()
      .where({
        id: params.id,
      })
      .update(updateData)
      .then(() => {});
    session.flash({
      info: `${this.singleItem} Updated Successfully.`,
    });
    return response.route(this.indexRoute);
  }

  async destroy({ params, session, response }) {
    this.model
      .query()
      .where({
        id: params.id,
      })
      .delete()
      .then(() => {});
    session.flash({
      info: `${this.singleItem} Deleted Successfully.`,
    });
    return response.route(this.indexRoute);
  }
}

module.exports = ResourceController;
