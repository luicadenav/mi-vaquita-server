import Joi from "joi";

const GroupSchema = Joi.object({
  name: Joi.string().min(1).trim().max(30).required(),
  color: Joi.string()
    .min(4)
    .max(7)
    .trim()
    .pattern(new RegExp("^#?([a-fA-F0-9]{6}|[a-fA-F0-9]{3})$"))
    .required(),
  id: Joi.string().strip().pattern(new RegExp("^[0-9]+$")),
});

const queryGroupSchema = Joi.object({
  sort: Joi.string().valid("ASC", "DESC").default("DESC"),
});

export { GroupSchema, queryGroupSchema };
