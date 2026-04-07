import { Router } from "express";
import { RelatoryController } from "../controllers/relatoryController";
import { authenticatedMiddleware } from "../middlewares/authenticatedMiddleware";
import { checkRoleMiddleware } from "../middlewares/checkRoleMiddleware";

const relatoryRouter = Router()
const relatoryController = new RelatoryController

//list all
    relatoryRouter.get("/relatorios", authenticatedMiddleware, relatoryController.listAll)
//create
    relatoryRouter.post("/relatorios/novo", authenticatedMiddleware, checkRoleMiddleware(['Administrador','Administradora']), relatoryController.create)
//update
    relatoryRouter.patch("/relatorios/editar", authenticatedMiddleware, checkRoleMiddleware(['Administrador','Administradora']), relatoryController.update)
//delete
    relatoryRouter.delete("/relatorios/:id", authenticatedMiddleware, checkRoleMiddleware(['Administrador','Administradora']), relatoryController.delete)
//search by id
    relatoryRouter.get("/relatorios/:id", authenticatedMiddleware, relatoryController.searchRelatoryById)
//search by event id
    relatoryRouter.get("/relatorios/evento/:event", authenticatedMiddleware, relatoryController.searchRelatoryByEventId)
//search by send date
    relatoryRouter.get("/relatorios/data-envio/:date", authenticatedMiddleware, relatoryController.searchRelatoryBySendDate)

export { relatoryRouter }