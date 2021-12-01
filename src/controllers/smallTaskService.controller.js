import { smallTaskService } from "../services/smallTask.service";

const createBigTask = async (req, res) => {
  try {
    const { result, msg, data } = await smallTaskService.createSmallTask(req);

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

const updateDone = async (req, res) => {
  try {
    const { result, msg, data } = await smallTaskService.updateDone(req);

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

const updateTitle = async (req, res) => {
  try {
    const { result, msg, data } = await smallTaskService.updateTitle(req);

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

const deleteTask = async (req, res) => {
  try {
    const { result, msg, data } = await smallTaskService.deleteTask(req);

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

export const smallTaskController = {
  createBigTask,
  updateDone,
  updateTitle,
  deleteTask,
};
