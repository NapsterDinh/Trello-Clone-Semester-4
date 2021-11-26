import Joi from "joi";

//define board
export const workSpaceTypeCollectionName = "workSpaceTypes";
export const workSpaceTypeCollectionSchema = Joi.object({
  name: Joi.string().required(),
  workSpaceId: Joi.array().items(Joi.string()).default([]),
});

export const validateSchema = async (data) => {
  return await workSpaceTypeCollectionSchema.validateAsync(data, {
    abortEarly: false,
  });
};
