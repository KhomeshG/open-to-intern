
// const  { default: mongoose } = require('mongoose');



const isValidName = function(name){
    if (/^[a-zA-Z]{1,35}/.test(name)) return true
    return false
  }



const isValidBody = function (data) {
    return Object.keys(data).length > 0;
  }


  module.exports.isValidBody = isValidBody
  module.exports.isValidName = isValidName