import { _post, _put } from "../../../utilities/apis/api";
export const resetPass = (data) => {
  return _put("/v1/user/reset", data);
};
