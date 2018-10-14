'use strict'

const Support = use('App/Models/Support');
const SupportType = use('App/Models/SupportType');

const {
    validateAll
  } = use('Validator');
  const validationMessages = use('App/Helpers/ValidationMessages');

class SupportController {
    async index({
        auth,
        view,
        request
    }) {
        const page = request.input('page') || 1;
        return view.render('app.supports.index', {
            supports : (await Support.query().where({user_id: auth.user.id}).orderBy('id', 'desc').paginate(page)).toJSON()
        });
        
    }

    async show({
        params,
        view
    }) {
        return view.render('app.supports.show', {
            support: (await Support.query().where({
                id: params.id
            }).first()).toJSON()
        });
    }

    async create({view}) {
        return view.render('app.supports.create',{
            types : await SupportType.query().get() 
        });
    }

    async store({
        request,
        response,
        session,
        auth
    }) {
        
        const validationRules = {
            type: 'required',
            message: 'required'
        };
    
        const validation = await validateAll(request.all(), validationRules, validationMessages);
    
        if (validation.fails()) {
            session
                .withErrors(validation.messages())
            return response.redirect('back')
        }

        const createData = request.only(['type', 'message']);
    
        await Support.create({...createData, user_id: auth.user.id });

        session.flash({
            info: `Message Sent Successfully.`
        });

        return response.route('app.supports.index'); 
    }

}

module.exports = SupportController
