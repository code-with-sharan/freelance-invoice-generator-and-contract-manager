import express from "express";
import { createUser } from "../controllers/user.js";
import { authenticateToken } from "../middlewares/firebase.js";

const userRoute = express.Router();

userRoute.post("/", authenticateToken, createUser);

export default userRoute;
