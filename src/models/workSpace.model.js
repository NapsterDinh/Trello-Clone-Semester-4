import Joi from "joi";

//define board
export const workSpaceCollectionName = "workSpaces";
export const workSpaceCollectionSchema = Joi.object({
  workspacetypeId: Joi.string().required(),
  userId: Joi.array().items(Joi.string()).default([]),
  boardId: Joi.array().items(Joi.string()).default([]),
  userCreate: Joi.string().required(),
  name: Joi.string().required(),
  description: Joi.string(),
});
