import Joi from "joi";
import { getDB } from "../config/mongodb";
import { ObjectId } from "mongodb";

//define card
export const cardCollectionName = "cards";
const cardCollectionSchema = Joi.object({
  boardId: Joi.string().required(),
  columnId: Joi.string().required(),
  title: Joi.string().required().min(3).max(20),
  cover: Joi.string().default(null),
  createAt: Joi.date().timestamp().default(Date.now()),
  updateAt: Joi.date().timestamp().default(null),
  _destroy: Joi.boolean().default(false),
  decription: Joi.string().required().max(20),
});

const validateSchema = async (data) => {
  return await cardCollectionSchema.validateAsync(data, {
    abortEarly: false,
  });
};

const creatNew = async (data) => {
  try {
    const validatedValue = await validateSchema(data);
    const insertValue = {
      ...validatedValue,
      boardId: ObjectId(validatedValue.boardId),
      columnId: ObjectId(validatedValue.columnId),
    };
    const result = await getDB()
      .collection(cardCollectionName)
      .insertOne(insertValue);
    console.log(result);
    return result;
  } catch (error) {
    throw new Error(error);
  }
};

export const CardModel = { cardCollectionName, creatNew };
