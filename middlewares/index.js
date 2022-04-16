const fieldsValidator = require('./fields-validator');
const JWTValidator    = require('./jwt-validator.js');
const roleValidator   = require('./role-validator.js');

module.exports = {
  ...fieldsValidator,
  ...JWTValidator,
  ...roleValidator,
}