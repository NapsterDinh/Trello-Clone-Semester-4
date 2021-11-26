import { userService } from "../services/user.service";
import { apiMessage } from "../utilties/api-message";

const register = async (req, res) => {
  try {
    const { result, msg, data } = await userService.createUser(req.body);

    res.json({
      result: result,
      msg: msg || apiMessage.registerSuccess,
      data: data,
    });
  } catch (err) {
    return res.status(500).json({ msg: err.message });
  }
};

const verifyEmail = async (req, res) => {
  try {
    await userService.activateEmail(req.query.token);
    console.log("querytoken", req.query.token);
    res.json({ msg: "Account has been activated!" });
  } catch (err) {
    return res.status(500).json({ msg: err.message });
  }
};

const login = async (req, res) => {
  try {
    const { result, msg, data } = await userService.login(req.body);
    console.log("asd");
    console.log("login", result, msg);
    res.json({
      result: result,
      msg: msg || apiMessage.loginSuccess,
      data: data,
    });
  } catch (err) {
    return res.status(500).json({ msg: err.message });
  }
};

const forgotPassword = async (req, res) => {
  try {
    const { result, msg } = await userService.forgotPassword(req.body);
    console.log("result", result);
    res.json({
      result: result,
      msg: msg || apiMessage.sendMailForgotPassword,
    });
  } catch (err) {
    return res.status(500).json({ msg: err.message });
  }
};

const resetPassword = async (req, res) => {
  try {
    console.log("req", req.body);
    console.log("req1", req.user);
    await userService.resetPassword(req);
    res.json({
      result: true,
      msg: apiMessage.resetPasswordSuccess,
    });
  } catch (err) {
    return res.status(500).json({ msg: err.message });
  }
};

const updateUser = async (req, res) => {
  try {
    const data = await userService.updateUser(req);
    res.json({
      result: true,
      msg: apiMessage.updateUserSuccess,
      data: data,
    });
  } catch (err) {
    return res.status(500).json({ msg: err.message });
  }
};

const googleLogin = async (req, res) => {
  try {
    const { result, msg, data } = await userService.googleLogin(req.body);

    console.log("sssssss", result, msg, data);

    res.json({
      result: result,
      msg: msg || apiMessage.loginSuccess,
      data: data,
    });
  } catch (err) {
    return res.status(500).json({ msg: err.message });
  }
};

const facebookLogin = async (req, res) => {
  try {
    const { result, msg, data } = await userService.facebookLogin(req.body);

    res.json({
      result: result,
      msg: msg || apiMessage.loginSuccess,
      data: data,
    });
  } catch (err) {
    return res.status(500).json({ msg: err.message });
  }
};

export const UserController = {
  register,
  verifyEmail,
  login,
  forgotPassword,
  resetPassword,
  updateUser,
  googleLogin,
  facebookLogin,
};
