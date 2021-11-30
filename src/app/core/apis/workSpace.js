import { _get, _post, _delete, _put } from "../../../utilities/apis/api";

//api

export const getWorkSpaceOwerAndGuest = (data) => {
  return _get("/v1/workSpace/getWorkSpaceGuestOrOwer");
};

export const addNewWorkSpace = (data) => {
  return _post("/v1/workSpace/create", data);
};

export const getWorkSpaceById = (data) => {
  return _get("/v1/workSpace/getWorkSpaceById", {_id: data});
};

export const deleteWorkSpace = (data) => {
  return _delete("/v1/workSpace/delete", {_id: data});
};

export const getAllUserAndUserInWorkSpace = (data) => {
  return _get("/v1/workSpace/getAllUserAndUserInWorkSpace", {_id: data});
};

export const updatePrivacy = (data) => {
  return _put("/v1/workSpace/updatePrivacy",{
    _id: data._id,
    priority: data.priority
  });
};

export const updateWP = (data) => {
  return _put("/v1/workSpace/update", data);
};


export const inviteUser = (data) => {
  return _post("/v1/workSpace/inviteUser", {
    _id: data._id,
    userMail: data.userMail
  });
};

export const removeUser = (data) => {
  console.log(_put("/v1/workSpace/removeUser", {
    _id: data._id,
    userMail: data.userMail
  }))
  return _put("/v1/workSpace/removeUser", {
    _id: data._id,
    userMail: data.userMail
  });
};

