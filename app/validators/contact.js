const joi = require("joi");

const identifySchema = joi
  .object({
    phoneNumber: joi.string().allow(null),
    email: joi.string().email().allow(null)
  })
  .or("phoneNumber", "email");

module.exports = { identifySchema };
