'use strict';

const Visitation = use('App/Models/Visitation');
const { validateAll } = use('Validator');
const validationMessages = use('App/Helpers/ValidationMessages');

class VisitationController {
    
    async store({ request, response, session, auth }) {
        const validationRules = {
            project_id: 'required',
            subject: 'required',
            message: 'required',
        };
      
        const validation = await validateAll(
            request.all(), validationRules, validationMessages
        );
    
        if (validation.fails()){
            session.withErrors(validation.messages());
            return response.redirect('back');
        }
    
        const { project_id, subject, message } = request.all();

        Visitation.create({
            user_id: auth.user.id,
            project_id: project_id,
            subject: subject,
            message: message,
        }).then(() => {});
      
        session.flash({
            info: 'Visitation successfully schedule',
        });
      
        return response.route('app.packages.choose');
    }
}

module.exports = VisitationController;