import Joi from "joi";

const createnew = async (req, res, next) => {
  const condition = Joi.object({
    boardId: Joi.string().required(),
    columnId: Joi.string().required(),
    title: Joi.string().required(),
    decription: Joi.string(),
    image: Joi.string(),
    fileName: Joi.string(),
  });

  try {
    await condition.validateAsync(req.body, { abortEarly: false });
    next();
  } catch (error) {
    res.status(500).json({
      errors: new Error(error).message,
    });
  }
};

export const CardValidation = { createnew };
