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

const getAllUserAndUserExistInWorkSpace = async (req, res) => {
  try {
    const { result, msg, data } =
      await workSpaceService.getAllUserAndUserExistInWorkSpace(req.query);
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
    const { result, msg, data } = await workSpaceService.updateWorkSpace(req);
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
    const { result, msg, data } = await workSpaceService.deleteWorkSpace(req);
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
    const { result, msg } = await workSpaceService.addUserToWorkSpace(req);
    console.log("controller", result);

    res.json({
      result: result,
      msg: msg,
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

const updatePrivacy = async (req, res) => {
  try {
    const { result, msg, data } = await workSpaceService.updatePrivacy(req);
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

const inviteUser = async (req, res) => {
  try {
    const result = await workSpaceService.inviteUser(req);
    console.log("controller", result);

    res.json({
      msg: `You join work Space name: ${result[0]}`,
    });
  } catch (error) {
    res.status(500).json({
      errors: error.message,
    });
  }
};

const getWorkSpaceById = async (req, res) => {
  try {
    const { result, msg, data } = await workSpaceService.getWorkSpaceById(req);
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
  getAllUserAndUserExistInWorkSpace,
  updatePrivacy,
  inviteUser,
  getWorkSpaceById,
};
