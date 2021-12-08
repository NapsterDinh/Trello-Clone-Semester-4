import express from "express";
import { BoardController } from "../controllers/board.controller";
import { BoardValidation } from "../validations/board.validation";
import { auth } from "../middlewares/auth";

const router = express.Router();

router
  .route("/add")
  .post(BoardValidation.createnew, auth, BoardController.creatNew);
router.route("/").get(auth, BoardController.getFullBoard);
router.route("/listUserBoard").get(auth, BoardController.listUserBoard); //auth,
router.route("/update").put(auth, BoardController.updateBoard);
router.route("/updateColumnOrder").put(auth, BoardController.updateColumnOrder);
router.route("/delete").delete(auth, BoardController.deteleBoard);
router.route("/addUserToBoard").put(auth, BoardController.addUserToBoard);
router.route("/removeUserToBoard").put(auth, BoardController.removeUserToBoard);
router.route("/upLoadImage").put(auth, BoardController.upLoadImage);

export const boardRoute = router;
