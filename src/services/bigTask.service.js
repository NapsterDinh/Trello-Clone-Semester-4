//library component
import { ObjectId } from "mongodb";

//user component
import { getDB } from "../config/mongodb";
import { bigTaskCollectionName, validateSchema } from "../models/bigTast.model";
import { cardCollectionName } from "../models/card.model";
import { smallTaskCollectionName } from "../models/smallTask.model";
import { CardService } from "./card.service";
import { smallTaskService } from "./smallTask.service";

const createBigTask = async (data) => {
  try {
    const isCheckUser = await getDB()
      .collection(cardCollectionName)
      .findOne({ _id: ObjectId(data?.body?.cardId) });

    if (isCheckUser?.userId.includes(data.user?.sub)) {
      //data?.user?.sub

      console.log("data", data.body);
      const dataa = data?.body;
      const value = await validateSchema(dataa);
      console.log("data", value);
      const result = await getDB()
        .collection(bigTaskCollectionName)
        .insertOne(value);
      if (result?.acknowledged) {
        await getDB()
          .collection(cardCollectionName)
          .updateOne(
            { _id: ObjectId(data?.body?.cardId) },
            { $push: { bigTaskOrder: result.insertedId.toString() } }
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
    } else {
      return {
        result: false,
        msg: "You is not permission create task ",
        data: [],
      };
    }
  } catch (error) {
    throw new Error(error);
  }
};

const getBigTaskById = async (data) => {
  const objectIdArray = data.map((s) => ObjectId(s));
  console.log("bigTask", objectIdArray);
  const resultUser = await getDB()
    .collection(bigTaskCollectionName)
    .find({ _id: { $in: objectIdArray } })
    .toArray();

  console.log("resultUser", resultUser);
  return resultUser;
};

const updateTitle = async (data) => {
  try {
    const { _id, title } = data.body;

    const card = await getDB()
      .collection(bigTaskCollectionName)
      .findOne({ _id: ObjectId(_id) });

    const isCheckUser = await getDB()
      .collection(cardCollectionName)
      .findOne({ _id: ObjectId(card?.cardId) });

    if (isCheckUser?.userId.includes(data.user?.sub)) {
      await getDB()
        .collection(bigTaskCollectionName)
        .updateOne({ _id: ObjectId(_id) }, { $set: { title: title } });

      const result = await getDB()
        .collection(bigTaskCollectionName)
        .findOne({ _id: ObjectId(_id) });
      if (result) {
        return {
          result: true,
          msg: "Update task success",
          data: result,
        };
      } else {
        return {
          result: false,
          msg: "Update task fail",
          data: [],
        };
      }
    } else {
      return {
        result: false,
        msg: "You is not permission update task ",
        data: [],
      };
    }
  } catch (error) {
    throw new Error(error);
  }
};

const deleteBigTask = async (data) => {
  try {
    const { _id } = data.query;
    console.log("_id: ", _id);
    const card = await getDB()
      .collection(bigTaskCollectionName)
      .findOne({ _id: ObjectId(_id) });

    console.log("card search: ", card);

    const isCheckUser = await getDB()
      .collection(cardCollectionName)
      .findOne({ _id: ObjectId(card?.cardId) });

    if (isCheckUser?.userId.includes(data.user?.sub)) {
      const deleteTask = await getDB()
        .collection(bigTaskCollectionName)
        .deleteOne({ _id: ObjectId(_id) });

      if (deleteTask?.acknowledged) {
        await getDB()
          .collection(cardCollectionName)
          .updateOne(
            { _id: ObjectId(card?.cardId) },
            { $pull: { bigTaskOrder: { $in: [_id] } } }
          );
        await getDB()
          .collection(smallTaskCollectionName)
          .deleteMany({ bigTaskId: _id });

        await CardService.updatePercentageCard(card.cardId);
        return {
          result: true,
          msg: "Delete cart success",
          data: deleteTask,
        };
      } else {
        return { result: false, msg: "Delete cart fail", data: [] };
      }
    } else {
      return {
        result: false,
        msg: "You is not permission delete task ",
        data: [],
      };
    }
  } catch (error) {
    throw new Error(error);
  }
};

const updatePercentBigTask = async (id) => {
  try {
    const task = await getDB()
      .collection(bigTaskCollectionName)
      .findOne({ _id: ObjectId(id) });

    const objectIdArray = task?.smallStaskOrder.map((s) => ObjectId(s));

    const listBigTAsk = await smallTaskService.getSmallTaskById(objectIdArray);

    let totalDone = 0;

    const listSmall = listBigTAsk.map(function (e) {
      if (e.isDone) {
        totalDone++;
      }
    });
    if (listSmall === 0) {
      await updatePercentage(ObjectId(id), 0);
    } else {
      await updatePercentage(ObjectId(id), totalDone / listSmall.length);
    }
    await CardService.updatePercentageCard(task?.cardId);
  } catch (error) {
    throw new Error(error);
  }
};

const updatePercentage = async (_id, data) => {
  try {
    await getDB()
      .collection(bigTaskCollectionName)
      .updateOne(
        { _id: _id },
        { $set: { percentage: (data * 100).toFixed(0) } }
      );
  } catch (error) {
    throw new Error(error);
  }
};

export const bigTaskService = {
  createBigTask,
  updateTitle,
  deleteBigTask,
  getBigTaskById,
  updatePercentage,
  updatePercentBigTask,
};
