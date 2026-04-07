import { Router } from "express";
import { AuthController } from "../controllers/authController";

const authRouter = Router()
const authController = new AuthController()

//login
    authRouter.post("/login", authController.handle)

export { authRouter }