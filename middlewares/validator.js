const Joi = require("joi");
const createError = require("../utils/createError");

const registerSchema = Joi.object({
  email: Joi.string()
    .email({ tlds: false })
    .messages({
      "string.empty": "Email is required",
    })
    .required(),
  password: Joi.string()
    .pattern(/^[0-9a-zA-Z]{6,}$/)
    .required()
    .messages({
      "string.empty": "Password is required",
      "string.pattern.base":
        "Password must contain a-z, A-Z, or 0-9 and must be at least 6 characters",
    }),
  confirmPassword: Joi.string().required().valid(Joi.ref("password")).messages({
    "string.empty": "Confirm Password is required",
    "any.only": "Passwords do not match",
  }),
});

const loginSchema = Joi.object({
  email: Joi.string().email().trim().required().messages({
    "string.empty": "Email is required",
    "string.email": "Invalid Email",
  }),
  password: Joi.string().required().messages({
    "string.empty": "Password is required",
  }),
});

const validateSchema = (schema) => (req, res, next) => {
  const { value, error } = schema.validate(req.body);
  if (error) {
    return createError(400, error.details[0].message);
  }
  req.input = value;
  next();
};

exports.registerValidate = validateSchema(registerSchema);
exports.loginValidate = validateSchema(loginSchema);
