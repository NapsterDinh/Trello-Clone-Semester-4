import jwt from "jsonwebtoken";
import moment from "moment";
import { tokenTypes } from "../utilties/tokens";
import { envJwt } from "../utilties/env";

const generateAuthTokens = async (user) => {
  const accessTokenExpires = moment().add(
    envJwt.jwtAccessExpired / 60,
    "minutes"
  );
  const accessToken = generateToken(
    user._id.toString(),
    accessTokenExpires,
    tokenTypes.ACCESS
  );

  const refreshTokenExpires = moment().add(
    envJwt.jwtRefreshExpired / 60,
    "minutes"
  );
  const refreshToken = generateToken(
    user._id.toString(),
    refreshTokenExpires,
    tokenTypes.REFRESH
  );
  // await saveToken(refreshToken, user._id.toString(), refreshTokenExpires, tokenTypes.REFRESH)

  return {
    access: {
      token: accessToken,
      expires: accessTokenExpires.toDate(),
    },
    refresh: {
      token: refreshToken,
      expires: refreshTokenExpires.toDate(),
    },
  };
};

const generateToken = (userId, expires, type, secret = envJwt.jwtToken) => {
  const payload = {
    sub: userId,
    iat: moment().unix(),
    exp: expires.unix(),
    type,
  };
  return jwt.sign(payload, secret);
};

const getTokenByRefresh = async (refreshToken, isBlackListed) => {
  const refreshTokenDoc = await Token.findOne({
    token: refreshToken,
    type: tokenTypes.REFRESH,
    blacklisted: isBlackListed,
  });
  return refreshTokenDoc;
};

const saveToken = async (token, userId, expires, type, blacklisted = false) => {
  const tokenDoc = await Token.create({
    token,
    user: userId,
    expires: expires.toDate(),
    type,
    blacklisted,
  });
  return tokenDoc;
};

export const tokenService = {
  generateAuthTokens,
  generateToken,
  getTokenByRefresh,
};
