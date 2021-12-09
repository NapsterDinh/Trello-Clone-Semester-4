import { _post } from "../../../utilities/apis/api";

// APIS
export const signup = (data) => {
  return _post("/v1/user/register", data);
};
