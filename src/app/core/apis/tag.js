import { _get, _post, _put, _delete } from "../../../utilities/apis/api";

//api
//boardId (body)
export const addNewTag = (data) => {
  return _post("/v1/tag/create", data);
};

//_id, title (body)
export const updateTagName = (data) => {
    return _put("/v1/tag/updatename",data);
};

//_id, title (body)
export const updateTagColor = (data) => {
  return _put("/v1/tag/updateColor",data);
};

//_id (body)
export const deleteTag = (data) => {
    return _delete("/v1/tag/deleteTag", {_id: data});
};
  


