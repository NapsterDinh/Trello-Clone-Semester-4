import express from "express";
import { CardController } from "../controllers/card.controller";
import { CardValidation } from "../validations/card.validation";

const router = express.Router();

router.route("/").post(CardValidation.createnew, CardController.creatNew);

// router.route("/:id").put(CardValidation.update, CardController.update);

export const CardRoutes = router;