import { Router } from "express";
import { UserController } from "../controllers/userController";
import { authenticatedMiddleware } from "../middlewares/authenticatedMiddleware";
import { checkRoleMiddleware } from "../middlewares/checkRoleMiddleware";

const userRouter = Router()
const userController = new UserController()

// DOC USERS
/**
 * @openapi
 * /eco-kitoto/usuarios:
 *   get:
 *     summary: Listar todos os utilizadores
 *     description: Retorna a lista de utilizadores com os dados de localização aplanados.
 *     tags:
 *       - USERS
 *     security:
 *       - cookieAuth: []
 *     responses:
 *       200:
 *         description: Lista de utilizadores retornada com sucesso.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   iduser:
 *                     type: string
 *                     example: "9b1deb4d-3b7d-41b9-9189-e82200c01401"
 *                   name:
 *                     type: string
 *                     example: "João Silva"
 *                   email:
 *                     type: string
 *                     format: email
 *                     example: "joao.silva@ecokitoto.com"
 *                   telephone:
 *                     type: string
 *                     example: "+244923000000"
 *                   typeUser:
 *                     type: string
 *                     example: "Administrador | Administradora | Voluntário | Voluntária | Cidadão"
 *                   province:
 *                     type: string
 *                     example: "Cuanza Norte"
 *                   municipality:
 *                     type: string
 *                     example: "Cazengo"
 *                   districtId:
 *                     type: string
 *                     example: "3b7d-41b9-9189-e82200c01401"
 *                   district:
 *                     type: string
 *                     example: "Bairro Popular"
 *                   createdAt:
 *                     type: string
 *                     format: date-time
 *                     example: "2026-08-10T12:00:00.000Z"
 *       401:
 *         description: Não autorizado (Token inválido ou sem permissão).
 */

//======== LIST ALL USERS ========
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