import { _get, _post, _put, _delete } from "../../../utilities/apis/api";

//api
//boardId (body)
export const addNewColumn = (data) => {
  return _post("/v1/columns/create", data);
};

//_id, title (body)
export const updateColumn = (data) => {
    return _put("/v1/columns/update",data);
};

//_id, title (body)
export const updateCardOrder = (data) => {
  return _put("/v1/columns/updateCardOrder",data);
};

//_id (body)
export const deleteColumn = (data) => {
    return _delete("/v1/columns/delete", {_id: data});
};
  


