import { _get, _delete } from "../../../utilities/apis/api";

// APIS
export const getListNotificationByIdUser = () => {
  return _get("/api/v1/notification/listAllNotification",'');
};

//delete
export const deleteNotificationByIdNotify = (id) => {
  return _delete("/api/v1/notification/deleteNotificationById",{_id: id});
};
