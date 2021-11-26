import { CardService } from "../services/card.service";

const creatNew = async (req, res) => {
  try {
    const result = await CardService.createNew(req.body);
    console.log("controller", result);
    res.json(result);
  } catch (error) {
    res.status(500).json({
      errors: error.message,
    });
  }
};

export const CardController = { creatNew };
