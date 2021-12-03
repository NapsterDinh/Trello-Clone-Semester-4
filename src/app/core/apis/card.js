import { _get, _post, _put, _delete } from "../../../utilities/apis/api";

//api
//           /v1/cards/create
// body  {
//     "columnId":"61a0a9adc8dcb35c40971cd6",
//     "title":"cart 2",
//     "boardId":"61a5ce10c7674ec14e6a8889"
// }
export const addNewCard = (data) => {
  return _post("/v1/cards/create", data);
};

//         /v1/cards/updateTitle
// body  {
//     "title":"cart 2",
//     "_id":"61a6d6588c55bc3737ad7329"
// }
export const updateCard = (data) => {
    return _put("/v1/cards/updateTitle", 
    {
        "title":data.title,
        "_id":data._id
    }
    );
};

//          /v1/cards/updateDescription
// {
//     "description":"cart 33",
//     "_id":"61a6e3494648825573b324c3"
// }
export const updateDescription = (data) => {
    return _put("/v1/cards/updateDescription", 
    {
        "description":data.description,
        "_id":data._id
    });
};

//          /v1/cards/updateDate
// body {
//            "dateTime":"2021-12-02",          Nhớ yyyy-mm--date nha!
//     "_id":"61a6e3494648825573b324c3"
// }
export const updateDate = (data) => {
    return _put("/v1/cards/updateDate", 
    {
        "dateTime": data.dateTime,          //Nhớ yyyy-mm--date nha!
        "_id":data._id
    });
};

//          /v1/cards/updateAttachment
// {
//         "attachment":["a","b","c","e"],
//     "_id":"61a6e3494648825573b324c3"
// }
export const updateAttachment = (data) => {
    return _put("/v1/cards/updateAttachment", 
    {
        "attachment":data.attachment, //array
        "_id":data._id
    });
};

//          /v1/cards/updateColor
// body {
//            "color":"ffffff",
//     "_id":"61a6e3494648825573b324c3"
// }
export const updateColor = (data) => {
    return _put("/v1/cards/updateColor", 
    {
        "color":data.color,
        "_id":data._id
    });
};

//          /v1/cards/updateImage
// {
//     "image":"abc",
//     "_id":"61a6e3494648825573b324c3"
// }
export const updateImage = (data) => {
    return _put("/v1/cards/updateImage", 
    {
        "image":data.image,
        "_id":data._id
    });
};

//          /v1/cards/deleteCart
// params: _id:13421243
export const deleteCard = (data) => {
    return delete("/v1/cards/delete", {_id: data});
};

// //          /v1/cards/addUserToCard
// body {
//     "_id":"61a6e35a4648825573b324c4",
//     "listUser":["18110087@student.hcmute.edu.vn","phancaocuong0000@gmail.com"]
// }
export const addUserToCard = (data) => {
    return _put("/v1/cards/addUserToCard", {
        "_id":data._id,
        "listUser":data.listUser //array
    });
};

// //          /v1/cards/deleteCard
// body {
//     "_id":"61a6e35a4648825573b324c4",
//     "listUser":["18110087@student.hcmute.edu.vn","phancaocuong0000@gmail.com"]
// }
export const removeUserToCard = (data) => {
    return _put("/v1/cards/removeUserToCard", 
    {
        "_id":data._id,
        "listUser":data.listUser
    });
};




