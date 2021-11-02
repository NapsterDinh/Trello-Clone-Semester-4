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
  .route("/forgot_passsword")
  .post(UserValidation.forgotPassword, UserController.forgotPassword);
router
  .route("/reset")
  .post(UserValidation.resetPassword, auth, UserController.resetPassword);
router
  .route("/update")
  .post(UserValidation.updateUser, auth, UserController.updateUser);

//social
router.route("/login_google").post(UserController.googleLogin);

router.route("/login_facebook").post(UserController.facebookLogin);

export const UserRoutes = router;
