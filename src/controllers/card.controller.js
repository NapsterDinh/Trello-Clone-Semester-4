import { CardService } from "../services/card.service";
import { HttpStatusCode } from "../utilties/constants";

const creatNew = async (req, res) => {
  try {
    const result = await CardService.createNew(req.body);
    console.log("controller", result);
    res.status(HttpStatusCode.OK).json(result);
  } catch (error) {
    res.status(HttpStatusCode.INTERRAL_SREVER).json({
      errors: error.message,
    });
  }
};

export const CardController = { creatNew };
