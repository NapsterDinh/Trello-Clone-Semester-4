import { _post } from "../../../utilities/apis/api";

// APIS
export const loginFaceBook = (data) => {
  return _post("/api/v1/auth/facebook_login", data);
};
