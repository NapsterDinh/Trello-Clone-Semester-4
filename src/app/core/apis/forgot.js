import { _post } from "../../../utilities/apis/api";
export const forgot = (data) => {
  return _post("/v1/user/forgot_password", data);
};
