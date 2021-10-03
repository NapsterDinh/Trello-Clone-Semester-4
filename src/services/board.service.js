import { BoardModel } from "../models/board.model";

const createNew = async (data) => {
  try {
    const result = await BoardModel.creatNew(data);
    console.log("service", result);
    return result;
  } catch (error) {
    throw new Error(error);
  }
};

const getFullBoard = async (boardId) => {
  try {
    const result = await BoardModel.getFullBoard(boardId);
    console.log("service", result);
    return result;
  } catch (error) {
    throw new Error(error);
  }
};

export const BoardService = { createNew, getFullBoard };
