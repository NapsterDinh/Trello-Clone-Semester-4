import { _post } from "../../../utilities/apis/api";

// APIS
export const loginFaceBook = (data) => {
  return _post("/v1/user/facebook_login", data);
};
