//Library component
import express from "express";

//user component
import { boardRoute } from "./board.route";
import { columnRoutes } from "./column.route";
import { cardRoutes } from "./card.route";
import { userRoutes } from "./user.router";
import { workSpaceRoutes } from "./workSpace.route";
import { workSpaceTypeRoutes } from "./workSpaceType.route";

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

export const api = router;
