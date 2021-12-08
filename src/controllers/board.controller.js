import { BoardService } from "../services/board.service";

const creatNew = async (req, res) => {
  try {
    const { result, msg, data } = await BoardService.createNew(req);
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
    const result = await BoardService.getFullBoard(req);
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

const listUserBoard = async (req, res) => {
  try {
    const { result, msg, data } = await BoardService.listUserBoard(req);
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

const updateColumnOrder = async (req, res) => {
  try {
    const { result, msg, data } = await BoardService.updateColumnOrder(req);
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

const upLoadImage = async (req, res) => {
  try {
    const { result, msg, data } = await BoardService.upLoadImage(req);
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
  listUserBoard,
  updateColumnOrder,
  upLoadImage,
};
