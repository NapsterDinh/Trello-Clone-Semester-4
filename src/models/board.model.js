import Joi from "joi";
import { getDB } from "../config/mongodb";
import { ObjectId } from "mongodb";
import { ColumnModel } from "./column.model";
import { CardModel } from "./card.model";

//define board
const boardCollectionName = "boards";
const boardCollectionSchema = Joi.object({
  title: Joi.string().required().min(5).max(20).trim(),
  columnOrder: Joi.array().items(Joi.string()).default([]),
  createAt: Joi.date().timestamp().default(Date.now()),
  updateAt: Joi.date().timestamp().default(null),
  _destroy: Joi.boolean().default(false),
});

const validateSchema = async (data) => {
  return await boardCollectionSchema.validateAsync(data, { abortEarly: false });
};

const creatNew = async (data) => {
  try {
    const value = await validateSchema(data);
    console.log("value", value);
    const result = await getDB()
      .collection(boardCollectionName)
      .insertOne(value);
    console.log("model", result);
    return result;
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
};
//(boardId, columnId): String
const pushColumnOrder = async (boardId, columnId) => {
  try {
    const result = await getDB()
      .collection(boardCollectionName)
      .findOneAndUpdate(
        { _id: ObjectId(boardId) },
        {
          $push: {
            columnOrder: columnId,
          },
        },
        { returnOriginal: false }
      );
    return result;
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
};

const getFullBoard = async (boardId) => {
  console.log("boardId", boardId);
  try {
    const result = await getDB()
      .collection(boardCollectionName)
      .aggregate([
        {
          $match: {
            _id: ObjectId(boardId),
          },
        },
        {
          $lookup: {
            from: ColumnModel.columnCollectionName, //collection name
            localField: "_id",
            foreignField: "boardId",
            as: "columns",
          },
        },
        {
          $lookup: {
            from: CardModel.cardCollectionName, //collection name
            localField: "_id",
            foreignField: "boardId",
            as: "cards",
          },
        },
      ])
      .toArray();

    // console.log("result", result);

    return result[0] || {};
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
};

export const BoardModel = {
  creatNew,
  getFullBoard,
  pushColumnOrder,
};
