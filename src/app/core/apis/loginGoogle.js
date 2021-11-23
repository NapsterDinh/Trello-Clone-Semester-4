import { _post } from "../../../utilities/apis/api";

// APIS
export const loginGoogle = (data) => {
  return _post("/api/v1/auth/google_login", data);
};
