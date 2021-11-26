//library component
import { ObjectId } from "mongodb";

//user component
import { getDB } from "../config/mongodb";
import { ColumnModel } from "../models/column.model";
import { columnCollectionName } from "../models/column.model";
import { BoardService } from "./board.service";

const createNew = async (data) => {
  try {
    const newColumn = await ColumnModel.creatNew(data);
    await BoardService.pushColumnOrder(
      data.boardId,
      newColumn.insertedId.toString()
    );

    return newColumn;
  } catch (error) {
    throw new Error(error);
  }
};

const update = async (data) => {
  try {
    const { _id, title } = data;
    await getDB()
      .collection(columnCollectionName)
      .findOneAndUpdate(
        { _id: ObjectId(_id) },
        { $set: { title: title } },
        { returnOriginal: false, returnNewDocument: true }
      );

    const resultFind = await getDB()
      .collection(columnCollectionName)
      .findOne({}, { _id: ObjectId(_id) });

    console.log("result", resultFind);
    return resultFind;
  } catch (error) {
    throw new Error(error);
  }
};

const pushCardOrder = async (columnId, cardId) => {
  try {
    const result = await getDB()
      .collection(columnCollectionName)
      .findOneAndUpdate(
        { _id: ObjectId(columnId) },
        {
          $push: {
            cardOrder: cardId,
          },
        },
        { returnOriginal: false }
      );
    return result.value;
  } catch (error) {
    throw new Error(error);
  }
};

export const ColumnService = {
  createNew,
  update,
  pushCardOrder,
};
