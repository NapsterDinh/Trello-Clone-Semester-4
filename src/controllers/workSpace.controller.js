import { workSpaceService } from "../services/workSpace.service";

const addWorkSpace = async (req, res) => {
  try {
    const { result, msg, data } = await workSpaceService.createWorkSpace(req);

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

const getWorkSpace = async (req, res) => {
  try {
    const { result, msg, data } = await workSpaceService.getWorkSpace();
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

const getWorkSpaceGuestOrOwer = async (req, res) => {
  try {
    const { result, msg, data } =
      await workSpaceService.getWorkSpaceGuestOrOwer(req);
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

const updateWorkSpace = async (req, res) => {
  try {
    const { result, msg, data } = await workSpaceService.updateWorkSpace(
      req.body
    );
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

const deleteWorkSpace = async (req, res) => {
  try {
    const { result, msg, data } = await workSpaceService.deleteWorkSpace(
      req.body
    );
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

const addUserToWorkSpace = async (req, res) => {
  try {
    const { result, msg, data } = await workSpaceService.addUserToWorkSpace(
      req
    );
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

const removeUserToWorkSpace = async (req, res) => {
  try {
    const { result, msg, data } = await workSpaceService.removeUserToWorkSpace(
      req
    );
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

export const workSpaceController = {
  addWorkSpace,
  getWorkSpace,
  updateWorkSpace,
  deleteWorkSpace,
  addUserToWorkSpace,
  removeUserToWorkSpace,
  getWorkSpaceGuestOrOwer,
};
