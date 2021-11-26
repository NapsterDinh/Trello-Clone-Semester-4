import express from "express";
import { BoardController } from "../controllers/board.controller";
import { BoardValidation } from "../validations/board.validation";

const router = express.Router();

router.route("/add").post(BoardValidation.createnew, BoardController.creatNew);
router.route("/").get(BoardController.getFullBoard);
router.route("/update").put(BoardController.updateBoard);
router.route("/delete").delete(BoardController.deteleBoard);
router.route("/addUserToBoard").put(BoardController.addUserToBoard);
router.route("/removeUserToBoard").put(BoardController.removeUserToBoard);

export const boardRoute = router;
