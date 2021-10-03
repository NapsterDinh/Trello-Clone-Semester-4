import express from "express";
import { BoardController } from "../controllers/board.controller";
import { BoardValidation } from "../validations/Board.validation";

const router = express.Router();

router.route("/").post(BoardValidation.createnew, BoardController.creatNew);

router.route("/:id").get(BoardController.getFullBoard);

export const BoardRoute = router;
