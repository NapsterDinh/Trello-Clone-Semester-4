//Library component
import express from "express";

//user component
import { boardRoute } from "./board.route";
import { columnRoutes } from "./column.route";
import { cardRoutes } from "./card.route";
import { userRoutes } from "./user.router";
import { workSpaceRoutes } from "./workSpace.route";
import { workSpaceTypeRoutes } from "./workSpaceType.route";
import { bigTaskRoutes } from "./bigTask.route";
import { smallTaskRoutes } from "./smallTask.route";
import { tagRoutes } from "./tag.route";
import { upLoadRoutes } from "./image.router";
import { uploadFile } from "../shares/s3";

const router = express.Router();

router.get("/status", (req, res) => {
  res.status(200).json({
    status: "OK!",
  });
});

router.use("/boards", boardRoute);
router.use("/columns", columnRoutes);
router.use("/cards", cardRoutes);
router.use("/user", userRoutes);
router.use("/workSpace", workSpaceRoutes);
router.use("/workSpaceType", workSpaceTypeRoutes);
router.use("/bigTask", bigTaskRoutes);
router.use("/smallTask", smallTaskRoutes);
router.use("/tag", tagRoutes);
router.use("/image", upLoadRoutes);
export const api = router;
