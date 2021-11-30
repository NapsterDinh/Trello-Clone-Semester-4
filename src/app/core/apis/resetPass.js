import { _post } from "../../../utilities/apis/api";
export const resetPass = (data) => {
  return _post("/v1/user/reset", data);
};
