import express from "express";
import { image } from "../controllers/upLoadImage.controller";

const router = express.Router();

router.route("/").post(image.upLoad); //auth

export const upLoadRoutes = router;
