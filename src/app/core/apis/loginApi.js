import { _post } from "../../../utilities/apis/api";

// APIS
export const loginApi = (data) => {
  return _post("/api/v1/auth/login", data);
};
