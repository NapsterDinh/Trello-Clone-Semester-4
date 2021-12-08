import Joi from "joi";

//define card
export const cardCollectionName = "cards";
const cardCollectionSchema = Joi.object({
  boardId: Joi.string(),
  columnId: Joi.string(),
  title: Joi.string(),
  userCreate: Joi.string(),
  image: Joi.string().default(
    "https://pbs.twimg.com/profile_images/1361722806694785027/UY7DlO0a_400x400.png"
  ),

  description: Joi.string().default(""),
  attachment: Joi.array().items(Joi.string()).default([]),
  deadline: Joi.date().default(1924905600000),
  color: Joi.string().default(""),
  userId: Joi.array().items(Joi.string()).default([]),
  tagOrder: Joi.array().items(Joi.string()).default([]),
  bigTaskOrder: Joi.array().items(Joi.string()).default([]),
  percentage: Joi.string().default(""),
  status: Joi.string().default("undone"),
  _isExpired: Joi.boolean().default(false),
  createAt: Joi.date().timestamp().default(Date.now()),
});

export const validateSchema = async (data) => {
  return await cardCollectionSchema.validateAsync(data, { abortEarly: false });
};
