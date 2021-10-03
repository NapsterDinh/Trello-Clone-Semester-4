import { ColumnService } from "../services/column.service";
import { HttpStatusCode } from "../utilties/constants";

const creatNew = async (req, res) => {
  try {
    const result = await ColumnService.createNew(req.body);
    res.status(HttpStatusCode.OK).json(result);
  } catch (error) {
    res.status(HttpStatusCode.INTERRAL_SREVER).json({
      errors: error.message,
    });
  }
};

const update = async (req, res) => {
  console.log(req.params.id);
  console.log("body", req.body);
  try {
    const { id } = req.params;
    const result = await ColumnService.update(id, req.body);
    console.log("controll", result);
    res.status(HttpStatusCode.OK).json(result);
  } catch (error) {
    res.status(HttpStatusCode.INTERRAL_SREVER).json({
      errors: error.message,
    });
  }
};

export const ColumnController = { creatNew, update };
