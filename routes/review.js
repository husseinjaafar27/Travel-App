import express from "express";

import { create, getReview, getReviews, update } from "../controllers/reviewController.js";

import userAuth from "../middlewares/userAuth.js";

const router = express.Router();

router.post("/create/:tourID", userAuth, create);
router.patch("/update/:reviewID", userAuth, update);
router.get("/",getReviews);
router.get("/:reviewID",getReview);

export default router;
