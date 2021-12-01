import Joi from "joi";

//define tag
export const tagCollectionName = "tags";
const tagCollectionSchema = Joi.object({
  name: Joi.string(),
  color: Joi.string(),
  createAt: Joi.date().timestamp().default(Date.now()),
  updateAt: Joi.date().timestamp().default(null),
});

export const validateSchema = async (data) => {
  return await tagCollectionSchema.validateAsync(data, {
    abortEarly: false,
  });
};
