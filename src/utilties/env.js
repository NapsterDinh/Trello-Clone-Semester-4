export const envJwt = {
  jwtToken: process.env.JWT,
  jwtAccessExpired: parseInt(process.env.JWT_ACCESS_EXPIRED),
  jwtRefreshExpired: parseInt(process.env.JWT_REFRESH_EXPIRED),
};
