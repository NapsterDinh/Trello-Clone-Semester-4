import Joi from "joi";

const condition = Joi.object({
  title: Joi.string().required().min(3).max(20),
  workSpaceId: Joi.string(),
});

const createnew = async (req, res, next) => {
  try {
    await condition.validateAsync(req?.body, { abortEarly: false });
    next();
  } catch (error) {
    res.status(500).json({
      errors: new Error(error).message,
    });
  }
};

export const BoardValidation = { createnew };
