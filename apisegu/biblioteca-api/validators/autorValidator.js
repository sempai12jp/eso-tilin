const Joi = require('joi');

exports.autorSchema = Joi.object({
  nombre: Joi.string().min(2).max(100).required(),
  nacionalidad: Joi.string().min(2).max(50).required(),
  fechaNacimiento: Joi.date().required()
}); 