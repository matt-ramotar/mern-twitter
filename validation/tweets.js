const Validator = require('validator');
const validText = require('./valid-text');

module.exports = function validateTweetInput(text) {
  let errors = {};
  text = validText(text) ? text : '';

  if (!Validator.isLength(text, { min: 5, max: 140 }))
    errors.text = 'Tweet must be between 5 and 140 characters';

  if (Validator.isEmpty(data.text)) errors.txt = 'Text field is required';

  return {
    errors,
    isValid: Object.keys(errors).length === 0,
  };
};
