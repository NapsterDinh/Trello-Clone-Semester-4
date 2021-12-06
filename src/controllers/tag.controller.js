import { tagService } from "../services/tag.service";

const createTag = async (req, res) => {
  try {
    const { result, msg, data } = await tagService.createTag(req);

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

const updateName = async (req, res) => {
  try {
    const { result, msg, data } = await tagService.updateName(req);

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

const updateColor = async (req, res) => {
  try {
    const { result, msg, data } = await tagService.updateColor(req);

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

const deleteTag = async (req, res) => {
  try {
    const { result, msg, data } = await tagService.deleteTag(req);

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

const getListTag = async (req, res) => {
  try {
    const { result, msg, data } = await tagService.getListTag(req);

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

const tagOrder = async (req, res) => {
  try {
    const { result, msg, data } = await tagService.tagorder(req);

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

export const tagController = {
  createTag,
  updateName,
  updateColor,
  deleteTag,
  getListTag,
  tagOrder,
};
