import express from "express";
import { deleteUser, getUser, getUsers, updateUser } from "../controllers/userController.js";
import userAuth from "../middlewares/userAuth.js";

const router = express.Router();

router.patch("/update",userAuth, updateUser);
router.delete("/delete",userAuth, deleteUser);
router.get("/getUser/:id", getUser);
router.get("/getUsers/", getUsers);

export default router;
