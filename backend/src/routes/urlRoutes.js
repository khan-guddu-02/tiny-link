import express from "express";
import { shortenUrl, redirectUrl, listUrls } from "../controllers/urlController.js";

const router = express.Router();

router.post("/shorten", shortenUrl);
router.get("/list", listUrls);
router.get("/:shortId", redirectUrl);

export default router;
