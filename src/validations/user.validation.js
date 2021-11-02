import Joi from "joi";
import { HttpStatusCode } from "../utilties/constants";

const createnewUser = async (req, res, next) => {
  const condition = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email({
      minDomainSegments: 2,
      tlds: { allow: ["com", "net"] },
    }),
    password: Joi.string().required().min(6).trim(),
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

const login = async (req, res, next) => {
  const condition = Joi.object({
    email: Joi.string().email({
      minDomainSegments: 2,
      tlds: { allow: ["com", "net"] },
    }),
    password: Joi.string().required().min(6).trim(),
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

const forgotPassword = async (req, res, next) => {
  const condition = Joi.object({
    email: Joi.string()
      .required()
      .email({
        minDomainSegments: 2,
        tlds: { allow: ["com", "net"] },
      }),
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

const resetPassword = async (req, res, next) => {
  const condition = Joi.object({
    password: Joi.string().required().min(6).trim(),
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

const updateUser = async (req, res, next) => {
  const condition = Joi.object({
    name: Joi.string().required().min(3).trim(),
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

export const UserValidation = {
  createnewUser,
  login,
  forgotPassword,
  resetPassword,
  updateUser,
};
