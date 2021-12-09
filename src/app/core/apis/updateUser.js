import { _patch } from "../../../utilities/apis/api";

//api

export const updateUser = (data) => {
  return _patch("/user/update", data);
};
