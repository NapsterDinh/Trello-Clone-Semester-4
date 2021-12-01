import express from "express";
import { bigTaskController } from "../controllers/bigTask.controller";
import { auth } from "../middlewares/auth";

const router = express.Router();

router.route("/create").post(auth, bigTaskController.createBigTask); //auth
//           /v1/bigTask/create
// body  {
//     "columnId":"61a0a9adc8dcb35c40971cd6",
//     "title":"cart 2",
//     "boardId":"61a5ce10c7674ec14e6a8889"
// }

router.route("/updateTitle").put(auth, bigTaskController.updateTitle);
//         /v1/bigTask/updateTitle
// body  {
//     "title":"task 11",
//     "_id":"61a7450ef900bf62663a4ee6"
// }

router.route("/deleteBigTask").delete(auth, bigTaskController.deleteBigTask);
//          /v1/bigTask/deleteBigTask
// params: _id:13421243

export const bigTaskRoutes = router;
