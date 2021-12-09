import { _get, _post, _put, _delete } from "../../../utilities/apis/api";

//api
// body
//{
//  board
//}
export const addNewBoard = (data) => {
  return _post("/v1/boards/add", data);
};

export const getFullBoard = (data) => {
  return _get("/v1/boards/", {boardId: data});
};

// _id, userCreate (query)
export const listUserBoard = (data) => {
  return _get("/v1/boards/listUserBoard", {
    _id: data
  });
};

//_id, title, userId (body)
export const updateBoard = (data) => {
  return _put("/v1/boards/update", data
  );
};

export const updateColumnOrder = (data) => {
  return _put("/v1/boards/updateColumnOrder", data);
};

export const upLoadImage = (data) => {
  return _put("/v1/boards/upLoadImage", data);
};

//_id (body)
export const deleteBoard = (data) => {
  return _delete("/v1/boards/delete", {
    _id: data
  });
};

// _id, userId (body)
export const addUserToBoard = (data) => {
  return _put("/v1/boards/addUserToBoard", data)
};

//_id, userId (body)
export const removeUserToBoard = (data) => {
  return _put("/v1/boards/removeUserToBoard", data);
};



