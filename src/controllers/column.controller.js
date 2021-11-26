import { ColumnService } from "../services/column.service";

const creatNew = async (req, res) => {
  try {
    const result = await ColumnService.createNew(req.body);
    console.log("result", result);
    res.json(result);
  } catch (error) {
    res.status(500).json({
      errors: error.message,
    });
  }
};

const update = async (req, res) => {
  try {
    const result = await ColumnService.update(req.body);
    res.json(result);
  } catch (error) {
    res.status(500).json({
      errors: error.message,
    });
  }
};

export const ColumnController = { creatNew, update };
