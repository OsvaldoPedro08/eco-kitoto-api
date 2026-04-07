import { Router } from "express";
import { ProvinceController } from "../controllers/provinceController";
import { authenticatedMiddleware } from "../middlewares/authenticatedMiddleware";
import { checkRoleMiddleware } from "../middlewares/checkRoleMiddleware";

const provinceRouter = Router()
const provinceController = new ProvinceController()

//list all
    provinceRouter.get("/provincia", authenticatedMiddleware, provinceController.listAll)

//save
    provinceRouter.post("/provincia/nova", authenticatedMiddleware, checkRoleMiddleware(['Administrador','Administradora']), provinceController.create)

//update
    provinceRouter.patch("/provincia/editar/:id", authenticatedMiddleware, checkRoleMiddleware(['Administrador','Administradora']), provinceController.update)

//delete
    provinceRouter.delete("/provincia/:id", authenticatedMiddleware, checkRoleMiddleware(['Administrador','Administradora']), provinceController.delete)

//search province by name
    provinceRouter.get("/provincia/:name", authenticatedMiddleware, provinceController.searchByName)

export { provinceRouter }