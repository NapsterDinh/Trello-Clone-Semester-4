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
  image: Joi.string().default(
    "https://pbs.twimg.com/profile_images/1361722806694785027/UY7DlO0a_400x400.png"
  ),
  priority: Joi.string().default("private"),
});
