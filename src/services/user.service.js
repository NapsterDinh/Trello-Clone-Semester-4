import { UserModel } from "../models/user.model";
import { tokenService } from "./token.service";
import jwt from "jsonwebtoken";
import { getDB } from "../config/mongodb";
import { ObjectId } from "mongodb";
import { userCollectionName } from "../models/user.model";
import { ApiError } from "../utilties/api-error";
import httpStatus from "http-status";
import bcrypt from "bcrypt";
import { sendEmail } from "./sendMail.service";
const { APP_SCHEMA, APP_HOST, APP_PORT, CLIENT_PORT } = process.env;

const createUser = async (userBody) => {
  const { email } = userBody;
  const result = await getDB()
    .collection(userCollectionName)
    .findOne({ email });
  if (result) {
    return {
      result: false,
      msg: "Email is already taken",
      data: userBody,
    };
  }
  const hashpassword = await bcrypt.hash(userBody.password, 12);
  const data = {
    ...userBody,
    password: hashpassword,
  };
  console.log("userBogy", data);
  const user = await UserModel.creatNewUser(data);
  console.log("user", user);

  const token = await tokenService.generateAuthTokens(user);

  console.log("token", token);
  const url = `${APP_SCHEMA}://${APP_HOST}:${APP_PORT}/v1/user/verify-email?token=${token.access.token}`;

  sendEmail(userBody.email, url, "Verify your email address");
  return {
    result: true,
    msg: "Verify your email address",
    data: { user, token },
  };
};

const activateEmail = async (data) => {
  const userId = jwt.verify(data, process.env.JWT);
  const { sub } = userId;
  console.log("sub", sub);

  await getDB()
    .collection(userCollectionName)
    .findOneAndUpdate(
      { _id: ObjectId(sub) },
      {
        $set: { isEmailVerified: true },
      },
      { returnOriginal: false }
    );
};

const login = async (data) => {
  const { email, password } = data.body;
  const _id = data.user.sub;
  // const user = await userCollectionSchema.findOne({ _id });

  console.log("user", user);
  const user = await getDB().collection(userCollectionName).findOne({ email });

  const isMatch = await bcrypt.compare(password, user.password);
  if (!user?.email || !isMatch) {
    return {
      result: false,
      msg: "Email or password incorrect ",
      data: "",
    };
  } else if (!user.isEmailVerified) {
    return {
      result: false,
      msg: "Email is not verify ",
      data: "",
    };
  }

  const token = await generateAuthTokens(user);
  return {
    result: true,
    msg: "Verify your email address",
    data: { user, token },
  };
};

const forgotPassword = async (data) => {
  const { email } = data;
  const user = await getDB().collection(userCollectionName).findOne({ email });

  if (!user?.email) {
    return {
      result: false,
      msg: "Email is not found ",
    };
  }
  const token = await generateAuthTokens(user);
  console.log("=====", token);
  const url = `${APP_SCHEMA}://${APP_HOST}:${CLIENT_PORT}/reset/${token.access.token}`;

  mailService(email, url, "Verify your email address");
  return {
    result: true,
  };
};

const resetPassword = async (data) => {
  const { password } = data.body;

  console.log("data.user", data.user);
  const hashPassword = await bcrypt.hash(password, 10);

  await getDB()
    .collection(userCollectionName)
    .findOneAndUpdate(
      { _id: ObjectId(data.user.sub) },
      {
        $set: { password: hashPassword },
      },
      { returnOriginal: false }
    );
};

const updateUser = async (data) => {
  const { name, avatar } = data.body;
  console.log("update", data.user);

  const user = await getDB()
    .collection(userCollectionName)
    .findOneAndUpdate(
      { _id: ObjectId(data.user.sub) },
      {
        $set: { name, avatar },
      },
      { returnOriginal: false }
    );
  return user;
};

const googleLogin = async (data) => {
  const { tokenId } = data;

  const verify = await client.verifyIdToken({
    idToken: tokenId,
    audience: process.env.MAILING_SERVICE_CLIENT_ID,
  });
  const { email_verified, email, name, picture } = verify.payload;

  const password = email + process.env.GOOGLE_SECRET;

  if (!email_verified) {
    return {
      result: false,
      msg: "Email verification failed. ",
    };
  }

  let user = await getDB().collection(userCollectionName).findOne({ email });
  console.log("verify.payload", user);

  if (user) {
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return {
        result: false,
        msg: "Password incorrect ",
      };
    }
    const userId = { _id: verify.payload.sub };
    const token = await generateAuthTokens(userId);

    return {
      result: true,
      data: { user, token },
    };
  } else {
    console.log("12");
    const newUser = {
      name,
      email,
      password: password,
      avatar: picture,
      isEmailVerified: email_verified,
      phone: 0,
    };

    user = await UserModel.creatNewUser(newUser);
    const token = await generateAuthTokens(user);
    return {
      result: true,
      data: { user, token },
    };
  }
};

const facebookLogin = async (body) => {
  const { accessToken, userID } = body;

  const URL = `https://graph.facebook.com/v2.9/${userID}/?fields=id,name,email,picture&access_token=${accessToken}`;
  console.log("URL", URL);
  const resFb = await fetch(URL)
    .then((res) => res.json())
    .then((res) => {
      return res;
    });

  const { email, name, picture } = resFb;
  const password = email + process.env.FACEBOOK_SECRET;
  let user = await getDB().collection(userCollectionName).findOne({ email });

  if (user) {
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return {
        result: false,
        msg: "Password incorrect ",
      };
    }
    const userId = { _id: user.id };

    const token = await generateAuthTokens(userId);

    return {
      result: true,
      data: { user, token },
    };
  } else {
    const newUser = {
      name,
      email,
      password: password,
      avatar: picture.data.url,
      isEmailVerified: true,
    };
    user = await UserModel.creatNewUser(newUser);
    const token = await generateAuthTokens(user);

    return {
      result: true,
      data: { user, token },
    };
  }
};

export const userService = {
  createUser,
  activateEmail,
  login,
  forgotPassword,
  resetPassword,
  updateUser,
  googleLogin,
  facebookLogin,
};
