// import { Date } from "joi";
import { ColumnModel } from "../models/column.model";
import { BoardModel } from "../models/board.model";

const createNew = async (data) => {
  try {
    const newColumn = await ColumnModel.creatNew(data);

    const updateBoard = await BoardModel.pushColumnOrder(
      data.boardId,
      newColumn.insertedId.toString()
    );
    console.log("updateBoard", updateBoard);
    return newColumn;
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
