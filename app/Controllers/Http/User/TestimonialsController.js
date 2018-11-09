'use strict'
const Testimonial = use('App/Models/Testimonial');

const {
    validateAll
  } = use('Validator');
  const validationMessages = use('App/Helpers/ValidationMessages');

class TestimonialsController {
  async get({
    view,
    auth,
  }) {
    let testimonial = await Testimonial.query().where({user_id: auth.user.id}).first() || {
        message : '',
        role: ''
    }
    return view.render('app.testimonials.get', {
        testimonial
    });
  }

  async update({
    request,
    response,
    session,
    auth
}) {
    const validationRules = {
        message: 'required',
        profession: 'required'
    };

    const validation = await validateAll(request.all(), validationRules, validationMessages);

    if (validation.fails()) {
        session
            .withErrors(validation.messages())
        return response.redirect('back')
    }

    const testimonial = await Testimonial.query({user_id: auth.user.id}).first()

    const createData = request.only(['profession', 'message']);
    if(testimonial){
        await Testimonial.query({user_id: auth.user.id}).update({
            message: createData.message,
            role: createData.profession
        });
    }else{
        await Testimonial.create({
            message: createData.message,
            role: createData.profession,
            user_id: auth.user.id,
            name: `${auth.user.last_name} ${auth.user.last_name}`
        });
    }

    session.flash({
        info: `Testimonial Submitted Successfully.`
    });

    return response.route('app.testimonials.get'); 
}

}

module.exports = TestimonialsController
