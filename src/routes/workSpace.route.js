import express from "express";
import { workSpaceController } from "../controllers/workSpace.controller";
import { getFullWorkSpace } from "../services/workSpace.service";
import { auth } from "../middlewares/auth";
const router = express.Router();

router.route("/").get(workSpaceController.getWorkSpace);
router.route("/getFull").get(auth, workSpaceController.getWorkSpaceGuestOrOwer);
router.route("/create").post(workSpaceController.addWorkSpace);
router.route("/update").put(workSpaceController.updateWorkSpace);
router.route("/delete").delete(workSpaceController.deleteWorkSpace);
router.route("/addUser").put(workSpaceController.addUserToWorkSpace);
router.route("/removeUser").put(workSpaceController.removeUserToWorkSpace);

//test

export const workSpaceRoutes = router;
