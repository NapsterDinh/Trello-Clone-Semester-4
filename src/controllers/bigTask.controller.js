import { bigTaskService } from "../services/bigTask.service";

const createBigTask = async (req, res) => {
  try {
    const { result, msg, data } = await bigTaskService.createBigTask(req);

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
    const { result, msg, data } = await bigTaskService.updateTitle(req);

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

const deleteBigTask = async (req, res) => {
  try {
    const { result, msg, data } = await bigTaskService.deleteBigTask(req);

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

const updatePercentBigTask = async (req, res) => {
  try {
    const { result, msg, data } = await bigTaskService.updatePercentBigTask(
      req
    );
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

export const bigTaskController = {
  createBigTask,
  updateTitle,
  deleteBigTask,
  updatePercentBigTask,
};
