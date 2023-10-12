const { joi } = require("../../config/importModule");

const login = joi.object({
  email: joi.string().lowercase().email().required(),
  password: joi.string().required()
})

module.exports = { login }