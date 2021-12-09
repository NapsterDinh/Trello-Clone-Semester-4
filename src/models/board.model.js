import Joi, { ref } from "joi";
import { getDB } from "../config/mongodb";
import { ObjectId } from "mongodb";
import { ColumnModel } from "./column.model";
import { CardModel } from "./card.model";

//define board
export const boardCollectionName = "boards";
const boardCollectionSchema = Joi.object({
  userId: Joi.array().items(Joi.string()).default([]),
  workSpaceId: Joi.string(),
  title: Joi.string().required().min(5).max(20).trim(),
  columnOrder: Joi.array().items(Joi.string()).default([]),
  tagOrder: Joi.array().items(Joi.string()).default([]),
  createAt: Joi.date().timestamp().default(Date.now()),
  image: Joi.string().default(
    "https://trello-backgrounds.s3.amazonaws.com/SharedBackground/2400x1600/bf776ffa2e906f248ea123ad04dc7493/photo-1632042704576-7ae3ef405c78.jpg"
  ),
  updateAt: Joi.date().timestamp().default(null),
  _destroy: Joi.boolean().default(false),
});

export const validateSchema = async (data) => {
  return await boardCollectionSchema.validateAsync(data, { abortEarly: false });
};
