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
    "https://images.unsplash.com/photo-1632042704576-7ae3ef405c78?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=Mnw3MDY2fDB8MXxjb2xsZWN0aW9ufDF8MzE3MDk5fHx8fHwyfHwxNjM4OTk1MDMy&ixlib=rb-1.2.1&q=80&w=200"
  ),
  updateAt: Joi.date().timestamp().default(null),
  _destroy: Joi.boolean().default(false),
});

export const validateSchema = async (data) => {
  return await boardCollectionSchema.validateAsync(data, { abortEarly: false });
};
