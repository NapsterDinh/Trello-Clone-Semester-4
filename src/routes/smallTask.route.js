import express from "express";
import { smallTaskController } from "../controllers/smallTaskService.controller";
import { auth } from "../middlewares/auth";

const router = express.Router();

router.route("/create").post(smallTaskController.createBigTask);
//           /v1/smallTask/create
// body {

//     "title":"task 3",
//     "bigTaskId":"61a7450ef900bf62663a4ee6"
// }

router.route("/updateDone").put(smallTaskController.updateDone);
//        /v1/smallTask/updateDone
// {
//     "_id":"61a75f1e7e2ccb95bc48d200",
//     "ischeck":"true"                     Nho: "ischeck":  true or false
// }

router.route("/updateTitle").put(smallTaskController.updateTitle);
//        /v1/smallTask/updateTitle
// {
//     "_id":"61a75f1e7e2ccb95bc48d200",
//     "title":"abc"
// }

router.route("/deleteTask").delete(smallTaskController.deleteTask);
//        /v1/smallTask/updateTitle
//params  :   _id=61a75f7d7e2ccb95bc48d203

export const smallTaskRoutes = router;
