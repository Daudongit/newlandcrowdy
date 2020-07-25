'use strict';

const Model = use('Model');

class Visitation extends Model {
    user(){
        return this.belongsTo('App/Models/User');
    }

    project(){
        return this.belongsTo('App/Models/Project');
    } 
}

module.exports = Visitation;
