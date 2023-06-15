import express from "express";
import {
  create,
  deleteBooking,
  getAllBooking,
  getBooking,
  update,
} from "../controllers/bookingController.js";
import userAuth from "../middlewares/userAuth.js";

const router = express.Router();

router.post("/create", userAuth, create);
router.get("/getBooking/:id", getBooking);
router.get("/getAll", userAuth, getAllBooking);
router.delete("/delete/:id", userAuth, deleteBooking);
router.patch("/update/:bookID", userAuth, update);

export default router;
