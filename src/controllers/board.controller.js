import { BoardService } from "../services/board.service";
import { HttpStatusCode } from "../utilties/constants";

const creatNew = async (req, res) => {
  try {
    const result = await BoardService.createNew(req.body);
    console.log("controller", result);
    res.status(HttpStatusCode.OK).json(result);
  } catch (error) {
    res.status(HttpStatusCode.INTERRAL_SREVER).json({
      errors: error.message,
    });
  }
};

const getFullBoard = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await BoardService.getFullBoard(id);
    res.status(HttpStatusCode.OK).json(result);
  } catch (error) {
    res.status(HttpStatusCode.INTERRAL_SREVER).json({
      errors: error.message,
    });
  }
};

export const BoardController = { creatNew, getFullBoard };
