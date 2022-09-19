// Regex for abbrevation
const sortName = function (sortName) {
  return /^([A-Za-z]{2,10})+$/.test(sortName);
};
//// Regex for personName
const personName = function (name) {
  return /^[A-Za-z, ]{8,80}$/.test(name);
};
// Regex for Number(Contain 10-Digits)
const mobile = function (mobile) {
  return /^(\+91[\-\s]?)?[0]?(91)?[789]\d{9}$/.test(mobile);
};

// Regex for Email_ID
const email = function (email) {
  return /^\w+([\.-]?\w+)@\w+([\.-]?\w+)(\.\w{2,3})+$/.test(email);
};

// Regex for links
const link = function (logolink) {
  return /^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_\+.~#?&\/=]*)$/.test(
    logolink
  );
};

//Just Exporting Multiple function
module.exports.isValid = { link, sortName, personName, mobile, email };
