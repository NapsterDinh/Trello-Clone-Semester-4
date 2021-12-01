import Joi from "joi";

//define board
export const bigTaskCollectionName = "bigTasks";
const bigTaskCollectionSchema = Joi.object({
  idCart: Joi.toString(),
  title: Joi.string(),
  percentage: Joi.decimal(),
  smallStaskOrder: Joi.array().items(Joi.string()).default([]),
  createAt: Joi.date().timestamp().default(Date.now()),
  updateAt: Joi.date().timestamp().default(null),
});

export const validateSchema = async (data) => {
  return await bigTaskCollectionSchema.validateAsync(data, {
    abortEarly: false,
  });
};
