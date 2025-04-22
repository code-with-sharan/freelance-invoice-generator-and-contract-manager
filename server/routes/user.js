import express from "express"
import { createUser } from "../controllers/user.js";

const userRoute = express.Router()

userRoute.post("/", createUser)

export default userRoute;