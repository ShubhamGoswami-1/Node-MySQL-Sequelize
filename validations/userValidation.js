import Joi from 'joi';

const createValidationSchema = (fields) => {
  // const schema = {};
  const schema = Joi.object({})
  if (fields.includes('name')) {
    schema.name = Joi.string().required();
  }
  if (fields.includes('email')) {
    schema.email = Joi.string().email().required();
  }
  if (fields.includes('phone')) {
    schema.phone = Joi.string().min(10).required();
  }
  if (fields.includes('password')) {
    schema.password = Joi.string().min(6).required();
  }
  if (fields.includes('confirmPassword')) {
    schema.confirmPassword = Joi.ref('password');
  }
  if (fields.includes('role')) {
    schema.role = Joi.string().valid('user', 'admin').required();
  }
  if (fields.includes('id')) {
    schema.id = Joi.number().integer().required();
  }

  return Joi.object(schema);
};

export const validate = (fields) => {
  return (req, res, next) => {
  const schema = createValidationSchema(fields);
  const { error, value } = schema.validate(req.body, { abortEarly: false });

  if (error) {
    const errorMessage = error.details.map((detail) => detail.message).join('. ');
    return res.status(400).json({ status: 'error', message: errorMessage });
  }

  req.body = value;
  next();
}};
