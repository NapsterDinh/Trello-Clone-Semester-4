import express from "express";
import { workSpaceController } from "../controllers/workSpace.controller";
import { getFullWorkSpace } from "../services/workSpace.service";
import { auth } from "../middlewares/auth";
const router = express.Router();

router.route("/").get(workSpaceController.getWorkSpace);
router
  .route("/getAllUserAndUserInWorkSpace")
  .get(workSpaceController.getAllUserAndUserExistInWorkSpace);
router
  .route("/getWorkSpaceGuestOrOwer")
  .get(auth, workSpaceController.getWorkSpaceGuestOrOwer); //auth,
router
  .route("/getWorkSpaceById")
  .get(auth, workSpaceController.getWorkSpaceById);
router.route("/create").post(auth, workSpaceController.addWorkSpace); //auth,
router.route("/update").put(auth, workSpaceController.updateWorkSpace); //auth
router.route("/updatePrivacy").put(auth, workSpaceController.updatePrivacy);
router.route("/upLoadImage").post(auth, workSpaceController.upLoadImage);
router.route("/delete").delete(auth, workSpaceController.deleteWorkSpace);
router.route("/inviteUser").post(auth, workSpaceController.inviteUser); //auth
router.route("/addUser").get(workSpaceController.addUserToWorkSpace);
router
  .route("/removeUser")
  .put(auth, workSpaceController.removeUserToWorkSpace); //auth
//test cho nay
//test

export const workSpaceRoutes = router;
