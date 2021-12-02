//library component
import { ObjectId } from "mongodb";

//user component
import { getDB } from "../config/mongodb";
import { boardCollectionName } from "../models/board.model";
import { columnCollectionName } from "../models/column.model";
import { validateSchema } from "../models/column.model";
import { BoardService } from "./board.service";

const createNew = async (data) => {
  try {
    const value = await validateSchema(data);

    const insertValue = {
      ...value,
      boardId: ObjectId(value.boardId),
    };

    const result = await getDB()
      .collection(columnCollectionName)
      .insertOne(insertValue);
    if (result?.acknowledged) {
      await BoardService.pushColumnOrder(
        data.boardId,
        result.insertedId.toString()
      );

      const data1 = {
        ...result,
        ...value,
      };

      data1._id = data1.insertedId;
      delete data1.insertedId;

      return {
        result: true,
        msg: "Create column success",
        data: data1,
      };
    } else {
      return {
        result: false,
        msg: "Create column fail",
        data: [],
      };
    }
  } catch (error) {
    throw new Error(error);
  }
};

const update = async (data) => {
  try {
    const { _id, title, cardOrder } = data;
    await getDB()
      .collection(columnCollectionName)
      .updateOne(
        { _id: ObjectId(_id) },
        {
          $set: {
            title: title,
            cardOrder: cardOrder,
          },
        }
      );

    const result = await getDB()
      .collection(columnCollectionName)
      .findOne({ _id: ObjectId(_id) });

    if (result) {
      return {
        result: true,
        msg: "Update column success",
        data: result,
      };
    } else {
      return {
        result: false,
        msg: "Update column fail",
        data: [],
      };
    }
  } catch (error) {
    throw new Error(error);
  }
};

const deleteColumn = async (data) => {
  try {
    const { _id } = data.query;

    const findBoardId = await getDB()
      .collection(columnCollectionName)
      .findOne({ _id: ObjectId(_id) });

    const result = await getDB()
      .collection(columnCollectionName)
      .findOneAndDelete({ _id: ObjectId(_id) }, { returnOriginal: false });
    if (result?.value) {
      await getDB()
        .collection(boardCollectionName)
        .updateOne(
          { _id: ObjectId(findBoardId?.boardId) },
          { $pull: { columnOrder: { $in: [_id] } } }
        );
      return {
        result: true,
        msg: "Delete column success",
        data: result,
      };
    } else {
      return {
        result: false,
        msg: "Delete column fail",
        data: [],
      };
    }
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
  deleteColumn,
  pushCardOrder,
};
