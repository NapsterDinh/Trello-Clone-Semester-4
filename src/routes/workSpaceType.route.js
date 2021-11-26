import express from "express";
import { workSpaceTypeController } from "../controllers/workSpaceType.controller";

const router = express.Router();

router.route("/").get(workSpaceTypeController.getWPType);
router.route("/create").post(workSpaceTypeController.addWorkSpaceType);

export const workSpaceTypeRoutes = router;
