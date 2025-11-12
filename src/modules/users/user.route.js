import express from "express";
import { getUser, createUser, deleteUser, getAllUser, userLogin } from "./user.controller.js";
import { tokenAuthentication } from "../../middleware/auth.js";

const router = express.Router();

router.get("/:username", tokenAuthentication, getUser);
router.get("/", tokenAuthentication, getAllUser);
router.post("/", createUser);
router.delete("/:username", deleteUser);
router.post("/login", userLogin);

export default router;