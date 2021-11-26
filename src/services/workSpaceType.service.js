//library component
import { ObjectId } from "mongodb";

//user component
import { getDB } from "../config/mongodb";
import { workSpaceTypeCollectionName } from "../models/workSpaceType.model";
import { validateSchema } from "../models/workSpaceType.model";

const createNew = async (data) => {
  try {
    const value = await validateSchema(data);
    const result = await getDB()
      .collection(workSpaceTypeCollectionName)
      .insertOne(value);
    console.log("validatedValue", result);
    if (result?.acknowledged) {
      return {
        result: true,
        msg: "Create workSpaceType success",
        data: { ...result, ...value },
      };
    } else {
      return {
        result: false,
        msg: "Create workSpaceType fail",
        data: [],
      };
    }
  } catch (error) {
    throw new Error(error);
  }
};

const getWPType = async () => {
  try {
    const result = await getDB()
      .collection(workSpaceTypeCollectionName)
      .find()
      .toArray();
    console.log("validatedValue", result);
    if (result) {
      return {
        result: true,
        msg: "Get workSpaceType success",
        data: result,
      };
    } else {
      return {
        result: false,
        msg: "Get workSpaceType fail",
        data: [],
      };
    }
  } catch (error) {
    throw new Error(error);
  }
};

export const workSpaceTypeService = {
  createNew,
  getWPType,
};
