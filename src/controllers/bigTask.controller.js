import { CardService } from "../services/card.service";

const createNew = async (req, res) => {
  try {
    const { result, msg, data } = await CardService.createNew(req);

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
    const { result, msg, data } = await CardService.updateTitle(req);

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

const updateDescription = async (req, res) => {
  try {
    const { result, msg, data } = await CardService.updateDescription(req);

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

const updateImage = async (req, res) => {
  try {
    const { result, msg, data } = await CardService.updateImage(req);
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

const updateAttachment = async (req, res) => {
  try {
    const { result, msg, data } = await CardService.updateAttachment(req);
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

const updateDate = async (req, res) => {
  try {
    const { result, msg, data } = await CardService.updateDate(req);
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
    const { result, msg, data } = await CardService.updateColor(req);
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

export const CardController = {
  createNew,
  updateTitle,
  updateDescription,
  updateAttachment,
  updateDate,
  updateImage,
  updateColor,
};
