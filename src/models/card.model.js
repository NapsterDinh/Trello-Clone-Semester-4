import Joi from "joi";

//define card
export const cardCollectionName = "cards";
const cardCollectionSchema = Joi.object({
  boardId: Joi.string().required(),
  columnId: Joi.string().required(),
  title: Joi.string().required(),
  image: Joi.string().default(
    "https://pbs.twimg.com/profile_images/1361722806694785027/UY7DlO0a_400x400.png"
  ),
  createAt: Joi.date().timestamp().default(Date.now()),
  updateAt: Joi.date().timestamp().default(null),
  _destroy: Joi.boolean().default(false),
  decription: Joi.string().default(""),
});

export const validateSchema = async (data) => {
  return await cardCollectionSchema.validateAsync(data, {
    abortEarly: false,
  });
};
