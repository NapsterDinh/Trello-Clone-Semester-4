import express from "express";
import { workSpaceController } from "../controllers/workSpace.controller";
import { getFullWorkSpace } from "../services/workSpace.service";

const router = express.Router();

router.route("/").get(workSpaceController.getWorkSpace);
router.route("/create").post(workSpaceController.addWorkSpace);
router.route("/update").put(workSpaceController.updateWorkSpace);
router.route("/delete").delete(workSpaceController.deleteWorkSpace);
router.route("/addUser").put(workSpaceController.addUserToWorkSpace);
router.route("/removeUser").put(workSpaceController.removeUserToWorkSpace);

//test
router.route("/get").get(getFullWorkSpace);

export const workSpaceRoutes = router;
