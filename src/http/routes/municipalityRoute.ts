import { Router } from "express";
import { MunicipalityController } from "../controllers/municipalityController";
import { authenticatedMiddleware } from "../middlewares/authenticatedMiddleware";
import { checkRoleMiddleware } from "../middlewares/checkRoleMiddleware";

const municipalityRouter = Router()
const municipalityController = new MunicipalityController()

//list all
    municipalityRouter.get("/municipio", authenticatedMiddleware, municipalityController.listAll)
//create
    municipalityRouter.post("/municipio/novo", authenticatedMiddleware, checkRoleMiddleware(['Administrador','Administradora']), municipalityController.create)
//update
    municipalityRouter.patch("/municipio/editar/:id", authenticatedMiddleware, checkRoleMiddleware(['Administrador','Administradora']), municipalityController.update)
//delete
    municipalityRouter.delete("/municipio/:id", authenticatedMiddleware, checkRoleMiddleware(['Administrador','Administradora']), municipalityController.delete)
//search by name of municipality
    municipalityRouter.get("/municipio/:name", authenticatedMiddleware, municipalityController.searchByName)

export { municipalityRouter }