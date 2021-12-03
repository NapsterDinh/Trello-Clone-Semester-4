import express from "express";
import { ColumnController } from "../controllers/column.controller";
import { ColumnValidation } from "../validations/column.validation";
import { auth } from "../middlewares/auth";

const router = express.Router();

router
  .route("/create")
  .post(ColumnValidation.createnew, ColumnController.creatNew);

router.route("/update").put(ColumnValidation.update, ColumnController.update);
router.route("/delete").delete(ColumnController.deleteColumn);
router.route("/updateCardOrder").put(auth, ColumnController.updateCardOrder);

export const columnRoutes = router;
