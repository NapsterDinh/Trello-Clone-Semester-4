import { _get, _post, _put, _delete } from "../../../utilities/apis/api";

//api
//boardId (body)
export const addNewBigTask = (data) => {
  return _post("/v1/bigTask/create", data);
};

//boardId (body)
export const updateTitle = (data) => {
  return _put("/v1/bigTask/updateTitle", data);
};

export const deleteBigTask = (data) => {
    return _delete("/v1/bigTask/deleteBigTask", {_id: data});
};
  


