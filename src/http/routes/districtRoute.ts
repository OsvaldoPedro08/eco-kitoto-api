import { Router } from "express";
import { DistrictController } from "../controllers/districtController";
import { authenticatedMiddleware } from "../middlewares/authenticatedMiddleware";
import { checkRoleMiddleware } from "../middlewares/checkRoleMiddleware";

const districtRouter = Router()
const districtController = new DistrictController()

//listAll
    districtRouter.get("/distrito", authenticatedMiddleware, districtController.listAll)
//insert
    districtRouter.post("/distrito/novo", authenticatedMiddleware, checkRoleMiddleware(['Administrador','Administradora']), districtController.create)
//update
    districtRouter.patch("/distrito/editar/:id", authenticatedMiddleware, checkRoleMiddleware(['Administrador','Administradora']), districtController.update)
//delete
    districtRouter.delete("/distrito/:id", authenticatedMiddleware, checkRoleMiddleware(['Administrador','Administradora']), districtController.delete)
//search by name of district
    districtRouter.get("/distrito/:name", authenticatedMiddleware, districtController.searchByName)

export { districtRouter }