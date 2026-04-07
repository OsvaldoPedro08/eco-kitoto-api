import { Router } from "express";
import { VolunteerParticipationController } from "../controllers/volunteerParticipationController";
import { authenticatedMiddleware } from "../middlewares/authenticatedMiddleware";
import { checkRoleMiddleware } from "../middlewares/checkRoleMiddleware";

const volunteerRouter = Router()
const volunteerController = new VolunteerParticipationController()

//list all
    volunteerRouter.get("/voluntarios", authenticatedMiddleware, checkRoleMiddleware(['Administrador','Administradora']), volunteerController.listAll)
//create
    volunteerRouter.post("/voluntarios/novo", authenticatedMiddleware, checkRoleMiddleware(['Voluntário','Voluntária']), volunteerController.create)
//delete
    volunteerRouter.delete("/voluntarios/:id", authenticatedMiddleware, checkRoleMiddleware(['Voluntário','Voluntária']), volunteerController.delete)
//pontuationUpdate
    volunteerRouter.patch("/voluntarios/:id", authenticatedMiddleware, checkRoleMiddleware(['Administrador','Administradora']), volunteerController.pontuationUpdate)
//search participation by id participation
    volunteerRouter.get("/voluntarios/:id", authenticatedMiddleware, checkRoleMiddleware(['Administrador','Administradora']), volunteerController.searchParticipationById)
//search participation by volunteer id
    volunteerRouter.get("/voluntarios/voluntario/:id", authenticatedMiddleware, checkRoleMiddleware(['Voluntário','Voluntária']), volunteerController.searchByVolunteerId)

export { volunteerRouter }