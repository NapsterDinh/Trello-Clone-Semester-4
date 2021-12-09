import { _get } from "../../../utilities/apis/api";

//api

export const getWorkSpaceTypeList = (data) => {
  return _get("/v1/workSpaceType/");
};
