import { CardService } from "../services/card.service";

const createNew = async (req, res) => {
  try {
    const { result, msg, data } = await CardService.createNew(req.body);
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

export const CardController = { createNew };
