import express from "express";
import { getUser, createUser, deleteUser, getAllUser, userLogin } from "./user.controller.js";

const router = express.Router();

router.get("/:username", getUser);
router.get("/", getAllUser);
router.post("/", createUser);
router.delete("/:username", deleteUser);
router.post("/login", userLogin);

export default router;