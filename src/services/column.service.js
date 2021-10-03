// import { Date } from "joi";
import { ColumnModel } from "../models/column.model";

const createNew = async (data) => {
  try {
    const result = await ColumnModel.creatNew(data);
    console.log("service", data);
    console.log("service", result);
    return result;
  } catch (error) {
    throw new Error(error);
  }
};

const update = async (id, data) => {
  try {
    const updateData = {
      ...data,
      updateAt: Date.now(),
    };
    const result = await ColumnModel.update(id, updateData);

    console.log("service", id);
    return result;
  } catch (error) {
    console.log("service", error);
    throw new Error(error);
  }
};

export const ColumnService = { createNew, update };
