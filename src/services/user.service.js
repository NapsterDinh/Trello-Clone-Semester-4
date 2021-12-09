//Library component
import { ObjectId } from "mongodb";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { google } from "googleapis";
import fetch from "node-fetch";

//user component
import { UserModel } from "../models/user.model";
import { userCollectionName } from "../models/user.model";
import { getDB } from "../config/mongodb";
import { tokenService } from "./token.service";
import { sendEmail } from "../shares/sendMail";
import { sendEmailUser } from "../shares/sendMail";

//variable
const { APP_SCHEMA, APP_HOST, APP_PORT, CLIENT_PORT } = process.env;
const { OAuth2 } = google.auth;
const client = new OAuth2(process.env.MAILING_SERVICE_CLIENT_ID);

//coding
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
  const user = await UserModel.creatNewUser(data);

  const token = await tokenService.generateAuthTokens(user);
  const url = `${APP_SCHEMA}://${APP_HOST}:${APP_PORT}/v1/user/verify-email?token=${token.access.token}`;

  sendEmail(userBody.email, url, "Verify your email address");
  return {
    result: true,
    msg: "Verify your email address",
    data: { user },
  };
};

const activateEmail = async (data) => {
  const userId = jwt.verify(data, process.env.JWT);
  const { sub } = userId;

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

const getUserByEmail = async (data) => {
  const resultUser = await getDB()
    .collection(userCollectionName)
    .find({ email: { $in: data } })
    .toArray();

  return resultUser;
};

const getUserById = async (data) => {
  const resultUser = await getDB()
    .collection(userCollectionName)
    .find({ _id: { $in: data } })
    .toArray();
  console.log("data", resultUser);
  return resultUser;
};

const getAllUser = async () => {
  const resultUser = await getDB()
    .collection(userCollectionName)
    .find()
    .toArray();

  return resultUser;
};

const login = async (data) => {
  const { email, password } = data;

  const user = await getDB().collection(userCollectionName).findOne({ email });
  if (user === null) {
    return {
      result: false,
      msg: "Email is not taken ",
      data: "",
    };
  } else if (!user?.isEmailVerified) {
    return {
      result: false,
      msg: "Email is not verify ",
      data: "",
    };
  }
  const isMatch = await bcrypt.compare(password, user?.password);
  if (!isMatch) {
    return {
      result: false,
      msg: "Password incorrect ",
      data: "",
    };
  }

  const token = await tokenService.generateAuthTokens(user);

  return {
    result: true,
    msg: "Login success",
    data: { user, token },
  };
};

var randomNumber = Math.floor(100000 + Math.random() * 900000);
const forgotPassword = async (data) => {
  const { email } = data;
  const user = await getDB().collection(userCollectionName).findOne({ email });

  if (!user?.email) {
    return {
      result: false,
      msg: "Email is not found ",
    };
  } else {
    const url = `Code verify: ${randomNumber}`;
    sendEmailUser(email, url);

    return {
      result: true,
      msg: "Check email see code verify ",
    };
  }
};

const resetPassword = async (data) => {
  const { password, codeVerify } = data.body;
  console.log("codeVerify", codeVerify);
  console.log("randomNumber", randomNumber);
  if (codeVerify !== randomNumber) {
    return {
      result: false,
      msg: "Code verify incorrect ",
    };
  } else {
    const hashPassword = await bcrypt.hash(password, 10);
    await getDB()
      .collection(userCollectionName)
      .findOneAndUpdate(
        { _id: ObjectId("61b17fe8560c427153b7d33b") }, //  data.user.sub
        {
          $set: { password: hashPassword },
        },
        { returnOriginal: false }
      );
    return {
      result: true,
      msg: "Password update success ",
    };
  }
};

const updatePassword = async (data) => {
  const { password } = data.body;

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

  return {
    result: true,
    msg: "Password update success ",
  };
};

const updateUser = async (data) => {
  const { name, avatar } = data.body;

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
  const hashpassword = await bcrypt.hash(password, 12);

  if (!email_verified) {
    return {
      result: false,
      msg: "Email verification failed. ",
    };
  }

  let user = await getDB().collection(userCollectionName).findOne({ email });

  if (user) {
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return {
        result: false,
        msg: "Password incorrect ",
      };
    }
    // const userId = { _id: verify.payload.sub };
    const token = await tokenService.generateAuthTokens(user);

    return {
      result: true,
      data: { user, token },
    };
  } else {
    const newUser = {
      name,
      email,
      password: hashpassword,
      avatar: picture,
      isEmailVerified: email_verified,
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
  const resFb = await fetch(URL)
    .then((res) => res.json())
    .then((res) => {
      return res;
    });

  const { email, name, picture } = resFb;
  const password = email + process.env.FACEBOOK_SECRET;

  const hashpassword = await bcrypt.hash(password, 12);

  let user = await getDB().collection(userCollectionName).findOne({ email });

  if (user) {
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return {
        result: false,
        msg: "Password incorrect ",
      };
    }
    // const userId = { _id: user.id };

    const token = await tokenService.generateAuthTokens(user);
    return {
      result: true,
      data: { user, token },
    };
  } else {
    const newUser = {
      name,
      email,
      password: hashpassword,
      avatar: picture.data.url,
      isEmailVerified: true,
    };
    user = await UserModel.creatNewUser(newUser);
    const token = await tokenService.generateAuthTokens(user);

    return {
      result: true,
      data: { user, token },
    };
  }
};

export const userService = {
  createUser,
  activateEmail,
  getUserByEmail,
  login,
  forgotPassword,
  resetPassword,
  updatePassword,
  updateUser,
  googleLogin,
  facebookLogin,
  getAllUser,
  getUserById,
};
