import Joi from "joi";
import { getDB } from "../config/mongodb";
import { ObjectId } from "mongodb";

//define board
export const workSpaceTypeCollectionName = "workSpaceTypes";
export const workSpaceTypeCollectionSchema = Joi.object({
  name: Joi.string().required(),
});

//id, name, id_ Workspacetype, descsription, id_user

const validateSchema = async (data) => {
  return await workSpaceTypeCollectionName.validateAsync(data, {
    abortEarly: false,
  });
};

const createWorkSpaceType = async (data) => {
  try {
    const value = await validateSchema(data);
    const result = await getDB()
      .collection(workSpaceTypeCollectionSchema)
      .insertOne(value);
    return { ...result, ...value };
  } catch (error) {
    throw new Error(error);
  }
};

export const workSpaceModel = {
  createWorkSpaceType,
};
