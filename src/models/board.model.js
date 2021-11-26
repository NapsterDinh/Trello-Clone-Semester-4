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
  createAt: Joi.date().timestamp().default(Date.now()),
  updateAt: Joi.date().timestamp().default(null),
  _destroy: Joi.boolean().default(false),
});

export const validateSchema = async (data) => {
  return await boardCollectionSchema.validateAsync(data, { abortEarly: false });
};

// const getFullBoard = async (boardId) => {
//   console.log("boardId", boardId);
//   try {
//     const result = await getDB()
//       .collection(boardCollectionName)
//       .aggregate([
//         {
//           $match: {
//             _id: ObjectId(boardId),
//           },
//         },
//         {
//           $lookup: {
//             from: ColumnModel.columnCollectionName, //collection name
//             localField: "_id",
//             foreignField: "boardId",
//             as: "columns",
//           },
//         },
//         {
//           $lookup: {
//             from: CardModel.cardCollectionName, //collection name
//             localField: "_id",
//             foreignField: "boardId",
//             as: "cards",
//           },
//         },
//       ])
//       .toArray();

//     return result[0] || {};
//   } catch (error) {
//     console.log(error);
//     throw new Error(error);
//   }
// };

// export const BoardModel = {
//   getFullBoard,
// };
