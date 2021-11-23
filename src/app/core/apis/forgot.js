import { _post } from "../../../utilities/apis/api";
export const forgot = (data) => {
  return _post("/api/v1/auth/forgot", data);
};
