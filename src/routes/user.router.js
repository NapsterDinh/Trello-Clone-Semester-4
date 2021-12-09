import express from "express";
import { UserController } from "../controllers/user.controller";
import { UserValidation } from "../validations/user.validation";
import { auth } from "../middlewares/auth";

const router = express.Router();

router
  .route("/register")
  .post(UserValidation.createnewUser, UserController.register);
router.route("/verify-email").get(UserController.verifyEmail);

router.route("/login").post(UserValidation.login, UserController.login);
router
  .route("/forgotPassword")
  .post(UserValidation.forgotPassword, UserController.forgotPassword);
router
  .route("/reset")
  .put(UserValidation.resetPassword, UserController.resetPassword);

router
  .route("/updatePassWord")
  .put(UserValidation.updatePassword, auth, UserController.resetPassword);

router
  .route("/update")
  .put(UserValidation.updateUser, auth, UserController.updateUser);

//social
router.route("/google_login").post(UserController.googleLogin);

router.route("/facebook_login").post(UserController.facebookLogin);

export const userRoutes = router;
