import { BoardService } from "../services/board.service";

const creatNew = async (req, res) => {
  try {
    const { result, msg, data } = await BoardService.createNew(req);
    console.log("controller", result);
    res.json({
      result: result,
      msg: msg,
      data: data,
    });
  } catch (error) {
    res.status(500).json({
      errors: error.message,
    });
  }
};

const getFullBoard = async (req, res) => {
  try {
    const { id } = req.query;
    const result = await BoardService.getFullBoard(req.query);
    res.json(result);
  } catch (error) {
    res.status(500).json({
      errors: error.message,
    });
  }
};

const updateBoard = async (req, res) => {
  try {
    const { result, msg, data } = await BoardService.updateBoard(req);
    console.log("controller", result);
    res.json({
      result: result,
      msg: msg,
      data: data,
    });
  } catch (error) {
    res.status(500).json({
      errors: error.message,
    });
  }
};

const deteleBoard = async (req, res) => {
  try {
    const { result, msg, data } = await BoardService.deleteBoard(req);
    console.log("controller", result);
    res.json({
      result: result,
      msg: msg,
      data: data,
    });
  } catch (error) {
    res.status(500).json({
      errors: error.message,
    });
  }
};

const addUserToBoard = async (req, res) => {
  try {
    const { result, msg, data } = await BoardService.addUserToBoard(req);
    console.log("controller", result);
    res.json({
      result: result,
      msg: msg,
      data: data,
    });
  } catch (error) {
    res.status(500).json({
      errors: error.message,
    });
  }
};

const removeUserToBoard = async (req, res) => {
  try {
    const { result, msg, data } = await BoardService.removeUserToBoard(req);
    console.log("controller", result);
    res.json({
      result: result,
      msg: msg,
      data: data,
    });
  } catch (error) {
    res.status(500).json({
      errors: error.message,
    });
  }
};

export const BoardController = {
  creatNew,
  getFullBoard,
  updateBoard,
  deteleBoard,
  addUserToBoard,
  removeUserToBoard,
};
