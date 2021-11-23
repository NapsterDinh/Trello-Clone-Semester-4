import { _patch } from "../../../utilities/apis/api";

//api

export const uploadAvatar = (data) => {
  return _patch("/api/upload_avatar", data);
};
