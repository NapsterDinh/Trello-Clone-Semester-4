import { ColumnService } from "../services/column.service";

const creatNew = async (req, res) => {
  try {
    const { result, msg, data } = await ColumnService.createNew(req.body);
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

const update = async (req, res) => {
  try {
    const { result, msg, data } = await ColumnService.update(req.body);
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

const deleteColumn = async (req, res) => {
  try {
    const { result, msg, data } = await ColumnService.deleteColumn(req.body);
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

export const ColumnController = {
  creatNew,
  update,
  deleteColumn,
};
