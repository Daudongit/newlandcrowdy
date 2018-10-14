'use strict'

const Model = use('Model')

class Plan extends Model {
  static get computed() {
    return ['color', 'perMonth', 'roi']
  }
  getColor({
    id
  }) {
    const colors = [
        "#e04646",
        "#0091cd",
        "#00ad45",
        "#fb8a2e",
      ]
      return colors[id % 4];
  }

  getPerMonth({
    interest,
    capital
  }){
    return interest * capital / 100
  }

  getRoi({
    interest,
    capital,
    duration
  }) {
    return interest * capital * duration / 100
  }


}

module.exports = Plan
