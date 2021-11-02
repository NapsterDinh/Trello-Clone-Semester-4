import express from "express";
import { HttpStatusCode } from "../utilties/constants";
import { BoardRoute } from "./board.route";
import { ColumnRoutes } from "./column.route";
import { CardRoutes } from "./card.route";
import { UserRoutes } from "./user.router";

const router = express.Router();

router.get("/status", (req, res) => {
  res.status(HttpStatusCode.OK).json({
    status: "OK!",
  });
});

router.use("/boards", BoardRoute);
router.use("/columns", ColumnRoutes);
router.use("/cards", CardRoutes);
router.use("/user", UserRoutes);

export const api = router;
