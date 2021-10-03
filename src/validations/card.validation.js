import Joi from "joi";
import { HttpStatusCode } from "../utilties/constants";

const createnew = async (req, res, next) => {
  const condition = Joi.object({
    boardId: Joi.string().required(),
    columnId: Joi.string().required(),
    title: Joi.string().required().min(3).max(30).trim(),
  });

  try {
    await condition.validateAsync(req.body, { abortEarly: false });
    next();
  } catch (error) {
    res.status(HttpStatusCode.BaD_REQUEST).json({
      errors: new Error(error).message,
    });
  }
};

export const CardValidation = { createnew };
