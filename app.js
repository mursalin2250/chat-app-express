import express from "express";
import userRoute from "./src/modules/user/user.route.js";

const router = express.Router();

router.use("/user", userRoute);

export default router;