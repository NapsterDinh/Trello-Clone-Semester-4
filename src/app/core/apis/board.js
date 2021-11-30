import { _get, _post, _delete } from "../../../utilities/apis/api";

//api

export const addNewBoard = (data) => {
  return _post("/v1/boards/add", data);
};



