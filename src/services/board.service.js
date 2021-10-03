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
    console.log("sever boardId", boardId);
    const board = await BoardModel.getFullBoard(boardId);
    // board.columns.forEach((column) => {
    //   column.cards = board.cards.filter((c) => {
    //     c.columnId.toString() === column._id.toString();
    //   });
    // });
    console.log("service", board);
    return board;
  } catch (error) {
    throw new Error(error);
  }
};

export const BoardService = { createNew, getFullBoard };
