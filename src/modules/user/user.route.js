import express from "express";
import { getUser, createUser, deleteUser, getAllUser } from "./user.controller.js";

const router = express.Router();

router.get("/getUser/:username", getUser);
router.get("/getAllUser", getAllUser);
router.post("/createUser", createUser);
router.delete("/deleteUser/:name", deleteUser);

export default router;