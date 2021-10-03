import Joi from "joi";
import { getDB } from "../config/mongodb";
import { ObjectId } from "mongodb";

//define Coloumn
const columnCollectionName = "columns";
const columnCollectionSchema = Joi.object({
  boardId: Joi.string().required(),
  title: Joi.string().required().min(3).max(30).trim(),
  cover: Joi.string().default(null),
  createAt: Joi.date().timestamp().default(Date.now()),
  updateAt: Joi.date().timestamp().default(null),
  _destroy: Joi.boolean().default(false),
});

const validateSchema = async (data) => {
  return await columnCollectionSchema.validateAsync(data, {
    abortEarly: false,
  });
};

const creatNew = async (data) => {
  try {
    const value = await validateSchema(data);
    const result = await getDB()
      .collection(columnCollectionName)
      .insertOne(value);
    console.log(result);
    return result;
  } catch (error) {
    throw new Error(error);
  }
};

const update = async (id, data) => {
  console.log("data", data);
  console.log("id", id);
  try {
    const result = await getDB()
      .collection(columnCollectionName)
      .findOneAndUpdate(
        { _id: ObjectId(id) },
        { $set: data },
        { returnOriginal: false }
      );

    return result.value;
  } catch (error) {
    throw new Error(error);
  }
};

export const ColumnModel = { creatNew, update };
