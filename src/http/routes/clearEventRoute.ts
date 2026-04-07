import { Router } from "express";
import { ClearEventController } from "../controllers/clearEventController";
import { authenticatedMiddleware } from "../middlewares/authenticatedMiddleware";
import { checkRoleMiddleware } from "../middlewares/checkRoleMiddleware";

const clearEventRouter = Router()
const clearEventController = new ClearEventController()

//list all clear event
    clearEventRouter.get("/evento-limpeza", authenticatedMiddleware, clearEventController.listAllEvent)
//create
    clearEventRouter.post("/evento-limpeza/novo", authenticatedMiddleware, checkRoleMiddleware(['Administrador','Administradora', 'Voluntário', 'Voluntária']), clearEventController.create)
//update
    clearEventRouter.patch("/evento-limpeza/editar/:id", authenticatedMiddleware, checkRoleMiddleware(['Administrador','Administradora', 'Voluntário', 'Voluntária']), clearEventController.update)
//delete
    clearEventRouter.delete("/evento-limpeza/:id", authenticatedMiddleware, checkRoleMiddleware(['Administrador','Administradora']), clearEventController.delete)
//search by id
    clearEventRouter.get("/evento-limpeza/:id", authenticatedMiddleware, clearEventController.searchById)
//search by responsible of clear event
    clearEventRouter.get("/evento-limpeza/responsavel/:usuario", authenticatedMiddleware, clearEventController.searchByResponsibleUser)
//search by locality/street
    clearEventRouter.get("/evento-limpeza/bairro/:bairro", authenticatedMiddleware, clearEventController.searchByLocality)
//search by time
    clearEventRouter.get("/evento-limpeza/horas/:horas", authenticatedMiddleware, clearEventController.searchByTime)
//search by status
    clearEventRouter.get("/evento-limpeza/status/:status", authenticatedMiddleware, clearEventController.searchByStatus)
//search by date
    clearEventRouter.get("/evento-limpeza/data/:data", authenticatedMiddleware, clearEventController.searchByDate)

export { clearEventRouter }