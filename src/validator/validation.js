
// const  { default: mongoose } = require('mongoose');



const isValidName = function(name){
    if (/^[a-zA-Z]{1,35}/.test(name)) return true
    return false
  }



const isValidBody = function (data) {
    return Object.keys(data).length > 0;
  }

const isValidLink=function(logolink){
  if(/^(?:([A-Za-z]+):)?(\/{0,3})([0-9.\-A-Za-z]+)(?::(\d+))?(?:\/([^?#]*))?(?:\?([^#]*))?(?:#(.*))?$/.test(logolink)) return true
  return false
}


  module.exports.isValidBody = isValidBody
  module.exports.isValidName = isValidName
  module.exports.isValidLink = isValidLink