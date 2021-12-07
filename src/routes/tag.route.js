import express from "express";
import { tagController } from "../controllers/tag.controller";
import { auth } from "../middlewares/auth";
import { tagCollectionName } from "../models/tag.model";

const router = express.Router();

router.route("/create").post(tagController.createTag);
//           /v1/tag/create
//  body {

//     "name":"tag 4",
//     "color":"000000",
//     "cardId":"61a6e35a4648825573b324c4"
// }

router.route("/updatename").put(tagController.updateName);
//        /v1/tag/updatename
// body {
//     "_id":"61a76b4e10737b49540d9d95",
//     "name":"fffaaa"
// }

router.route("/updateColor").put(tagController.updateColor);
//        /v1/tag/updateColor
// body {
//     "_id":"61a76b4e10737b49540d9d95",
//     "color":"fffaaa"
// }

router.route("/deleteTag").delete(tagController.deleteTag);
//        /v1/tag/deleteTag
//params  :   _id=61a75f7d7e2ccb95bc48d203

router.route("/listTag").get(tagController.getListTag);

router.route("/updateTagOrder").put(tagController.tagOrder);
//   /v1/tag/deleteTag

//body  {_id:3t163t2}

export const tagRoutes = router;
