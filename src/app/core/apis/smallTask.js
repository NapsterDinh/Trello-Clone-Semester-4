import { _get, _post, _put, _delete } from "../../../utilities/apis/api";

//api
//boardId (body)
export const addNewSmallTask = (data) => {
  return _post("/v1/smallTask/create", data);
};

//boardId (body)
export const updateTitleSmallTask = (data) => {
  return _put("/v1/smallTask/updateTitle", data);
};

export const updateDoneSmallTask = (data) => {
    return _put("/v1/smallTask/updateDone", data);
};

export const deleteSmallTask = (data) => {
    return _delete("/v1/smallTask/deleteTask", data);
};
  


