'use strict'
const Plan = use('App/Models/Plan');
const Faq = use('App/Models/Faq');
const Testimonial = use('App/Models/Testimonial');
const Reference = use('App/Models/Reference');
const Mail = use("Mail");
const Config = use("Config");

const {
    validateAll
  } = use('Validator');
  const validationMessages = use('App/Helpers/ValidationMessages');

class GuestController {
    async getIndex ({view}) {
        return view.render('guest.index',{
            plans : (await Plan.query().where({active: 1}).fetch()).toJSON(),
            testimonials : (await Testimonial.query().fetch()).toJSON(),
            counters : await Reference.query().where({type: 'counter'}).get(),
        })
    }

    getTrading ({view}) {
        return view.render('guest.trading')
    }

    async getFaq ({view}) {
        return view.render('guest.faq',{
            faqs : (await Faq.query().fetch()).toJSON()
        }) 
    }

    getAbout ({view}) {
        return view.render('guest.about')
    }
    
    getTerms ({view}) {
        return view.render('guest.terms')
    }
    

    

    getContact ({view}) {
        return view.render('guest.contact')
    }

    getChart ({view}) {
        return view.render('guest.chart')
    }

    async postContact({
        request,
        response,
        session,
    }) {
        
        const validationRules = {
            email: 'required',
            name: 'required',
            message: 'required'
        };
    
        const validation = await validateAll(request.all(), validationRules, validationMessages);
    
        if (validation.fails()) {
            session
                .withErrors(validation.messages())
            return response.redirect('back')
        }
        
        const {
            email,
            name, 
            message, 
          } = request.all();

        Mail.send('emails.contactus', {
            name,
            email,
            message
            }
        , (message) => {
            message
            .to(Config.get('mail.contact'))
            .from(Config.get('mail.from.email'), Config.get('mail.from.name'))
            .subject(Config.get('app.name') + ' - Contact Us')
        }).then(() => {})

        session.flash({
            info: `Message Sent Successfully.`
        });

        return response.route('guest.contact'); 
    }

}

module.exports = GuestController
