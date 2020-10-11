const Validator = require('validator');
const validText = require('./valid-text');

module.exports = function validateLoginInput(email, password) {
  let errors = {};
  email = validText(email) ? email : '';
  password = validText(password) ? password : '';

  if (!Validator.isEmail(email)) errors.email = 'Email is invalid';

  if (Validator.isEmpty(email)) errors.email = 'Email field is required';

  if (Validator.isEmpty(password)) errors.password = 'Password field is required';

  return {
    errors,
    isValid: Object.keys(errors).length === 0,
  };
};
