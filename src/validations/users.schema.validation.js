import Joi from "joi";

const schema = Joi.object({
  name: Joi.string().min(1).trim().max(100).required(),
  email: Joi.string().trim().max(100).email().required(),
  password: Joi.string().trim().required(),
});
export default schema;
