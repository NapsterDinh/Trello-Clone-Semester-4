import express from "express";
import { ColumnController } from "../controllers/column.controller";
import { ColumnValidation } from "../validations/column.validation";

const router = express.Router();

router
  .route("/create")
  .post(ColumnValidation.createnew, ColumnController.creatNew);

router.route("/update").put(ColumnValidation.update, ColumnController.update);
router.route("/detele").delete(ColumnController.deleteColumn);

export const columnRoutes = router;
