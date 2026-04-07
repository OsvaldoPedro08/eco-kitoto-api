import { Router } from "express";
import { MaterialController } from "../controllers/materialController";

const materialRoutes = Router()
const materialController = new MaterialController()

//list all
    materialRoutes.get("/materiais", materialController.listAll)
//create
    materialRoutes.post("/materiais/novo", materialController.create)
//update
    materialRoutes.patch("/materiais/editar/:id", materialController.update)
//delete
    materialRoutes.delete("/materiais/:id", materialController.delete)
//find by event id
    materialRoutes.get("/materiais/evento/:eventId", materialController.findMaterialByEventId)
export { materialRoutes }