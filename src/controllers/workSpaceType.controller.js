import { workSpaceTypeService } from "../services/workSpaceType.service";

const addWorkSpaceType = async (req, res) => {
  try {
    const { result, msg, data } = await workSpaceTypeService.createNew(
      req.body
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

const getWPType = async (req, res) => {
  try {
    const { result, msg, data } = await workSpaceTypeService.getWPType();

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

export const workSpaceTypeController = {
  addWorkSpaceType,
  getWPType,
};
