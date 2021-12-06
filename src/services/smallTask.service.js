//library component
import { TimestreamQuery } from "aws-sdk";
import { ObjectId } from "mongodb";

//user component
import { getDB } from "../config/mongodb";
import { bigTaskCollectionName } from "../models/bigTast.model";
import {
  smallTaskCollectionName,
  validateSchema,
} from "../models/smallTask.model";

const createSmallTask = async (data) => {
  try {
    const value = await validateSchema(data?.body);
    console.log("data", value);
    const result = await getDB()
      .collection(smallTaskCollectionName)
      .insertOne(value);
    if (result?.acknowledged) {
      await getDB()
        .collection(bigTaskCollectionName)
        .updateOne(
          { _id: ObjectId(data?.body?.bigTaskId) },
          { $push: { smallStaskOrder: result.insertedId.toString() } }
        );

      return {
        result: true,
        msg: "Create task success",
        data: { ...result, ...value },
      };
    } else {
      return {
        result: false,
        msg: "Create task fail",
        data: [],
      };
    }
  } catch (error) {
    throw new Error(error);
  }
};

const updateDone = async (data) => {
  try {
    const { _id, ischeck } = data.body;

    if (ischeck === "true") {
      await getDB()
        .collection(smallTaskCollectionName)
        .updateOne({ _id: ObjectId(_id) }, { $set: { isDone: true } });
      const result = await getDB()
        .collection(smallTaskCollectionName)
        .findOne({ _id: ObjectId(_id) });
      return {
        result: true,
        msg: "Task done! ",
        data: result,
      };
    } else {
      await getDB()
        .collection(smallTaskCollectionName)
        .updateOne({ _id: ObjectId(_id) }, { $set: { isDone: false } });

      const result = await getDB()
        .collection(smallTaskCollectionName)
        .findOne({ _id: ObjectId(_id) });
      return {
        result: false,
        msg: "Task undone! ",
        data: result,
      };
    }
  } catch (error) {
    throw new Error(error);
  }
};

const updateTitle = async (data) => {
  try {
    const { _id, title } = data.body;

    await getDB()
      .collection(smallTaskCollectionName)
      .updateOne({ _id: ObjectId(_id) }, { $set: { title: title } });
    const result = await getDB()
      .collection(smallTaskCollectionName)
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

const deleteTask = async (data) => {
  try {
    const { _id } = data.query;

    const bigTask = await getDB()
      .collection(smallTaskCollectionName)
      .findOne({ _id: ObjectId(_id) });

    const deleteTask = await getDB()
      .collection(smallTaskCollectionName)
      .deleteOne({ _id: ObjectId(_id) });

    if (deleteTask?.acknowledged) {
      await getDB()
        .collection(bigTaskCollectionName)
        .updateOne(
          { _id: ObjectId(bigTask?.bigTaskId) },
          { $pull: { smallStaskOrder: { $in: [_id] } } }
        );
      return {
        result: TimestreamQuery,
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

const getSmallTaskById = async (data) => {
  const resultUser = await getDB()
    .collection(smallTaskCollectionName)
    .find({ _id: { $in: data } })
    .toArray();
  console.log("resultUser", resultUser);
  return resultUser;
};

export const smallTaskService = {
  createSmallTask,
  updateDone,
  updateTitle,
  deleteTask,
  getSmallTaskById,
};
