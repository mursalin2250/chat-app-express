import express from "express";
import { getUser, createUser, deleteUser, getAllUser, userLogin, updatedUser } from "./user.controller.js";
import { tokenAuthentication } from "../../middleware/auth.js";

const router = express.Router();

router.post("/", createUser);
router.post("/login", userLogin);
router.get("/:value", tokenAuthentication, getUser);
router.get("/", tokenAuthentication, getAllUser);
router.post("/:username",updatedUser);
router.delete("/:username", deleteUser);

export default router;