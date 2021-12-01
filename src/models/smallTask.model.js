import Joi from "joi";

//define smallTask
export const smallTaskCollectionName = "smallTasks";
const smallTaskCollectionSchema = Joi.object({
  idBigTask: Joi.toString(),
  title: Joi.string(),
  isDone: Joi.boolean().default(false),
  createAt: Joi.date().timestamp().default(Date.now()),
  updateAt: Joi.date().timestamp().default(null),
});

export const validateSchema = async (data) => {
  return await smallTaskCollectionSchema.validateAsync(data, {
    abortEarly: false,
  });
};
