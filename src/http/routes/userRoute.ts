import { Router } from "express";
import { UserController } from "../controllers/userController";
import { authenticatedMiddleware } from "../middlewares/authenticatedMiddleware";
import { checkRoleMiddleware } from "../middlewares/checkRoleMiddleware";

const userRouter = Router()
const userController = new UserController()

//list all
    userRouter.get("/usuarios", authenticatedMiddleware, checkRoleMiddleware(['Administrador','Administradora']), userController.listAll)
//create
    userRouter.post("/usuarios/novo", userController.create)
//update
    userRouter.patch("/usuarios/editar/:id", authenticatedMiddleware, userController.update)
//delete
    userRouter.delete("/usuarios/:id", authenticatedMiddleware, userController.delete)
//search by email
    userRouter.get("/usuarios/:email", authenticatedMiddleware, userController.searchByEmail)

export { userRouter }