import { Router } from "express";
import { LogsController } from "../controllers/logsController";

const logsRouter = Router()
const logsController = new LogsController()

/**
 * @openapi
 * /eco-kitoto/logs:
 *   get:
 *     summary: Listar todos os logs do sistema
 *     tags:
 *       - LOGS
 *     responses:
 *       200:
 *         description: Lista de logs retornada com sucesso.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                     example: "log-12345"
 *                   action:
 *                     type: string
 *                     example: "CREATE_DISTRICT"
 *                   description:
 *                     type: string
 *                     example: "Novo distrito criado com sucesso"
 *                   createdAt:
 *                     type: string
 *                     format: date-time
 *                     example: "2026-09-04T14:30:00.000Z"
 *       400:
 *         description: Erro ao listar os logs do sistema.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Erro ao listar logs"
 */

//list all
    logsRouter.get("/logs", logsController.listAll)

export { logsRouter }