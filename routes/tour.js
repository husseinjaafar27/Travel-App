import express from "express";

import {
  create,
  deleteTour,
  getTour,
  getTours,
  update,
} from "../controllers/tourController.js";
import userAuth from "../middlewares/userAuth.js";
import isAdmin from "../middlewares/isAdmin.js";

const router = express.Router();

router.post("/create", userAuth, isAdmin, create);
router.patch("/update/:id", userAuth, isAdmin, update);
router.delete("/delete/:id", userAuth, isAdmin, deleteTour);
router.get("/:id", getTour);
router.get("/", userAuth, getTours);

export default router;
