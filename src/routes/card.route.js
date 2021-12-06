import express from "express";
import { CardController } from "../controllers/card.controller";
import { CardValidation } from "../validations/card.validation";
import { auth } from "../middlewares/auth";

const router = express.Router();

router.route("/create").post(auth, CardController.createNew); //auth
//           /v1/cards/create
// body  {
//     "columnId":"61a0a9adc8dcb35c40971cd6",
//     "title":"cart 2",
//     "boardId":"61a5ce10c7674ec14e6a8889"
// }

router.route("/updateTitle").put(CardController.updateTitle);
//          /v1/cards/updateTitle
// body  {
//     "title":"cart 2",
//     "_id":"61a6d6588c55bc3737ad7329"
// }

router.route("/updateDescription").put(auth, CardController.updateDescription);
//          /v1/cards/updateDescription
// {
//     "description":"cart 33",
//     "_id":"61a6e3494648825573b324c3"
// }

router.route("/updateImage").put(auth, CardController.updateImage);
//          /v1/cards/updateImage
// {
//     "image":"abc",
//     "_id":"61a6e3494648825573b324c3"
// }

router.route("/updateAttachment").put(auth, CardController.updateAttachment);
//          /v1/cards/updateAttachment
// {
//         "attachment":["a","b","c","e"],
//     "_id":"61a6e3494648825573b324c3"
// }

router.route("/updateDate").put(auth, CardController.updateDate);
//          /v1/cards/updateDate
// body {
//            "dateTime":"2021-12-02",          Nhớ yyyy-mm--date nha!
//     "_id":"61a6e3494648825573b324c3"
// }

router.route("/updateColor").put(auth, CardController.updateColor);
//          /v1/cards/updateDate
// body {
//            "color":"ffffff",
//     "_id":"61a6e3494648825573b324c3"
// }

router.route("/deleteCart").delete(auth, CardController.deleteCart);
//          /v1/cards/deleteCart
// params: _id:13421243

router.route("/addUserToCart").put(auth, CardController.addUserToCart);
// //          /v1/cards/addUserToCart
// body {
//     "_id":"61a6e35a4648825573b324c4",
//     "listUser":["18110087@student.hcmute.edu.vn","phancaocuong0000@gmail.com"]
// }

router.route("/removeUserToCart").put(auth, CardController.removeUserToCart);
// //          /v1/cards/removeUserToCart
// body {
//     "_id":"61a6e35a4648825573b324c4",
//     "listUser":["18110087@student.hcmute.edu.vn","phancaocuong0000@gmail.com"]
// }

router.route("/getCard").get(auth, CardController.getCardById); //auth
// //          /v1/cards/getCard

export const cardRoutes = router;
