import Joi from "joi";

//define board
export const bigTaskCollectionName = "bigTasks";
const bigTaskCollectionSchema = Joi.object({
  title: Joi.string(),
  cardId: Joi.string(),
  percentage: Joi.number().default(0),
  smallStaskOrder: Joi.array().items(Joi.string()).default([]),
  createAt: Joi.date().timestamp().default(Date.now()),
  updateAt: Joi.date().timestamp().default(null),
});

// export const validateSchema = async (data) => {
//   console.log("dataaaaa", data);
//   return await bigTaskCollectionSchema.validateAsync(data, {
//     abortEarly: false,
//   });
// };

export const validateSchema = async (data) => {
  return await bigTaskCollectionSchema.validateAsync(data, {
    abortEarly: false,
  });
};
