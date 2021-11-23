import { _post } from "../../../utilities/apis/api";
export const resetPass = (data) => {
  return _post("/api/v1/auth/reset", data);
};
