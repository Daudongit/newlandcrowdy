const dateFormat = require('dateformat');
const _ = require('lodash');
const {
  hooks
} = require('@adonisjs/ignitor')

hooks.after.providersBooted(() => {
  const View = use('View')

  View.global('formatTime', function (time, type) {
    if(!time){
      return "N/A"
    }
    if (type == 'L') {
      return dateFormat(time, "dddd, mmmm dS, yyyy, h:MM:ss TT");
    }
    return dateFormat(time, "mmmm dS, yyyy");
  })

  View.global('nl2br', function(str){
    return str.replace(/(?:\r\n|\r|\n)/g, '<br>');
  });
  
  View.global('parseInt', function(number){
    return parseInt(number);
  });

  View.global('currentYear', function(){
    return dateFormat(null, "yyyy");
  });

  // View.global('changeOrder', function(order){
  //   if(order)
  // });

  View.global('moneyFormat', function (money) {
    if(money){
      money = Number(money);
      // return `&#8358;${money.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}`
      return `&#8358;${money.toFixed(0).replace(/\d(?=(\d{3})+$)/g, '$&,')}`
    }
    return `&#8358;0.00`
  })

  View.global('numberFormat', function (money) {
    if(money){
      money = Number(money);
      return money.toFixed(0).replace(/\d(?=(\d{3})+$)/g, '$&,')
    }
    return '0.00'
  })

  View.global('lodash', function (object, path){
    return _.get(object, path, "NOT FOUND");
  });

  View.global('siteTitle', function () {
    return 'DigitalCoop'
  });

  View.global('excerpt', function (message) {
    const messageLength = 30;
    let toReturn = message.substr(0, messageLength)
    if(message.length > messageLength){
      toReturn += "...";
    }
    return toReturn
  });

})
