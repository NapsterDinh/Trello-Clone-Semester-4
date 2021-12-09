import { _post } from "../../../utilities/apis/api";

// APIS
export const loginApi = (data) => {
  return _post("/v1/user/login", data);
};
