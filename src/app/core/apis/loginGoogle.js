import { _post } from "../../../utilities/apis/api";

// APIS
export const loginGoogle = (data) => {
  return _post("/v1/user/google_login", data);
};
