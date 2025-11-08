import express from "express";
import { findUser, createUser, deleteUser } from "./user.controller.js";

const router = express.Router();

router.get("/show", findUser);
router.post("/create", createUser);
router.delete("/delete/:name", deleteUser);

export default router;