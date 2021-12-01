//library component
import { ObjectId } from "mongodb";

//user component
import { getDB } from "../config/mongodb";
import { bigTaskCollectionName } from "../models/bigTast.model";
import { columnCollectionName } from "../models/column.model";
import { boardCollectionName } from "../models/board.model";
import { ColumnService } from "./column.service";
import { BoardService } from "./board.service";
import { uploadFile, getFileStream } from "../shares/s3";
import { cardCollectionName } from "../models/card.model";
import { tagCollectionName, validateSchema } from "../models/tag.model";

const createTag = async (data) => {
  try {
    const value = await validateSchema(data?.body);

    const result = await getDB().collection(tagCollectionName).insertOne(value);
    if (result?.acknowledged) {
      await getDB()
        .collection(cardCollectionName)
        .updateOne(
          { _id: ObjectId(data?.body?.cardId) },
          { $push: { tagOrder: result.insertedId.toString() } }
        );

      return {
        result: true,
        msg: "Create tag success",
        data: { ...result, ...value },
      };
    } else {
      return {
        result: false,
        msg: "Create tag fail",
        data: [],
      };
    }
  } catch (error) {
    throw new Error(error);
  }
};

const updateName = async (data) => {
  try {
    const { _id, name } = data.body;

    await getDB()
      .collection(tagCollectionName)
      .updateOne({ _id: ObjectId(_id) }, { $set: { name: name } });
    const result = await getDB()
      .collection(tagCollectionName)
      .findOne({ _id: ObjectId(_id) });
    if (result) {
      return {
        result: true,
        msg: "update done! ",
        data: result,
      };
    } else {
      return {
        result: true,
        msg: "update done! ",
        data: result,
      };
    }
  } catch (error) {
    throw new Error(error);
  }
};

const updateColor = async (data) => {
  try {
    const { _id, color } = data.body;

    await getDB()
      .collection(tagCollectionName)
      .updateOne({ _id: ObjectId(_id) }, { $set: { color: color } });
    const result = await getDB()
      .collection(tagCollectionName)
      .findOne({ _id: ObjectId(_id) });
    if (result) {
      return {
        result: true,
        msg: "update done! ",
        data: result,
      };
    } else {
      return {
        result: true,
        msg: "update done! ",
        data: result,
      };
    }
  } catch (error) {
    throw new Error(error);
  }
};

const deleteTag = async (data) => {
  try {
    const { _id } = data.query;

    const card = await getDB()
      .collection(tagCollectionName)
      .findOne({ _id: ObjectId(_id) });
    console.log("card", card);
    const deleteTask = await getDB()
      .collection(tagCollectionName)
      .deleteOne({ _id: ObjectId(_id) });

    if (deleteTask?.acknowledged) {
      await getDB()
        .collection(cardCollectionName)
        .updateOne(
          { _id: ObjectId(card?.cardId) },
          { $pull: { tagOrder: { $in: [_id] } } }
        );
      return {
        result: false,
        msg: "You  delete task ",
        data: deleteTask,
      };
    } else {
      return {
        result: false,
        msg: "Delete task fail ",
        data: [],
      };
    }
  } catch (error) {
    throw new Error(error);
  }
};

export const tagService = {
  createTag,
  updateName,
  updateColor,
  deleteTag,
};
