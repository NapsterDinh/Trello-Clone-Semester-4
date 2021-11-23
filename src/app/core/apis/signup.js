import { _post } from "../../../utilities/apis/api";

// APIS
export const signup = (data) => {
  return _post("/api/v1/auth/register", data);
};
