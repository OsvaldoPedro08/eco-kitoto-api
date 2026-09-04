import { Router } from "express";
import { ClearEventController } from "../controllers/clearEventController";
import { authenticatedMiddleware } from "../middlewares/authenticatedMiddleware";
import { checkRoleMiddleware } from "../middlewares/checkRoleMiddleware";

const clearEventRouter = Router()
const clearEventController = new ClearEventController()

/**
 * @openapi
 * /eco-kitoto/evento-limpeza:
 *   get:
 *     summary: Listar todos os eventos de limpeza
 *     tags:
 *       - CLEAR_EVENT
 *     security:
 *       - cookieAuth: []
 *     responses:
 *       200:
 *         description: Lista de eventos de limpeza retornada com sucesso.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   idEvent:
 *                     type: string
 *                     example: "9b1deb4d-3b7d-41b9-9189-e82200c01401"
 *                   title:
 *                     type: string
 *                     example: "Limpeza do Bairro Popular"
 *                   areaId:
 *                     type: string
 *                     example: "3b7d-41b9-9189-e82200c01401"
 *                   responsibleId:
 *                     type: string
 *                     example: "usr-12345"
 *                   eventDate:
 *                     type: string
 *                     example: "2026-08-25"
 *                   eventTime:
 *                     type: string
 *                     example: "08:30"
 *                   descrition:
 *                     type: string
 *                     example: "Recolha de resíduos plásticos"
 *                   max_volunteer:
 *                     type: number
 *                     example: 50
 *                   meeting_point:
 *                     type: string
 *                     example: "Praça Central"
 *                   estatus:
 *                     type: string
 *                     example: "PENDENTE"
 *       500:
 *         description: Erro ao listar eventos de limpeza.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Erro ao listar Eventos de Limpeza!"
 *
 * /eco-kitoto/evento-limpeza/novo:
 *   post:
 *     summary: Criar um novo evento de limpeza
 *     tags:
 *       - CLEAR_EVENT
 *     security:
 *       - cookieAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - areaId
 *               - eventDate
 *               - eventTime
 *               - descrition
 *               - meeting_point
 *             properties:
 *               title:
 *                 type: string
 *                 example: "Limpeza do Bairro Popular"
 *               areaId:
 *                 type: string
 *                 example: "3b7d-41b9-9189-e82200c01401"
 *               eventDate:
 *                 type: string
 *                 format: date
 *                 example: "2026-08-25"
 *               eventTime:
 *                 type: string
 *                 example: "08:30"
 *               descrition:
 *                 type: string
 *                 example: "Recolha de resíduos plásticos"
 *               max_volunteer:
 *                 type: number
 *                 example: 50
 *               meeting_point:
 *                 type: string
 *                 example: "Praça Central"
 *               estatus:
 *                 type: string
 *                 example: "PENDENTE"
 *     responses:
 *       200:
 *         description: Evento de limpeza criado com sucesso.
 *       400:
 *         description: Campos inválidos.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Campos inválidos!"
 *
 * /eco-kitoto/evento-limpeza/editar/{id}:
 *   patch:
 *     summary: Atualizar dados de um evento de limpeza
 *     tags:
 *       - CLEAR_EVENT
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID do evento a atualizar
 *         schema:
 *           type: string
 *         example: "9b1deb4d-3b7d-41b9-9189-e82200c01401"
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 example: "Limpeza do Bairro Popular"
 *               areaId:
 *                 type: string
 *                 example: "3b7d-41b9-9189-e82200c01401"
 *               eventDate:
 *                 type: string
 *                 format: date
 *                 example: "2026-08-25"
 *               eventTime:
 *                 type: string
 *                 example: "08:30"
 *               descrition:
 *                 type: string
 *                 example: "Recolha de resíduos plásticos"
 *               max_volunteer:
 *                 type: number
 *                 example: 50
 *               meeting_point:
 *                 type: string
 *                 example: "Praça Central"
 *               estatus:
 *                 type: string
 *                 example: "PENDENTE"
 *     responses:
 *       200:
 *         description: Evento de limpeza atualizado com sucesso.
 *       400:
 *         description: Evento de limpeza não encontrado ou campos inválidos.
 *       500:
 *         description: Erro ao alterar dados.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Erro ao alterar dados do Evento de Limpeza!"
 *
 *
 * /eco-kitoto/evento-limpeza/eliminar/{id}:
 *   delete:
 *     summary: Eliminar um evento de limpeza
 *     tags:
 *       - CLEAR_EVENT
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID do evento a eliminar
 *         schema:
 *           type: string
 *         example: "9b1deb4d-3b7d-41b9-9189-e82200c01401"
 *     responses:
 *       200:
 *         description: Evento eliminado com sucesso.
 *       400:
 *         description: Evento de limpeza não encontrado.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Evento de Limpeza não encontrado!"
 * 
 * 
 * /eco-kitoto/evento-limpeza/{id}:
 *   get:
 *     summary: Pesquisar evento de limpeza por ID
 *     tags:
 *       - CLEAR_EVENT
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID do evento de limpeza
 *         schema:
 *           type: string
 *         example: "9b1deb4d-3b7d-41b9-9189-e82200c01401"
 *     responses:
 *       200:
 *         description: Evento encontrado com sucesso.
 *       400:
 *         description: Evento não encontrado.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Evento de Limpeza não encontrado!"
 *       500:
 *         description: Erro interno ao pesquisar por ID.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Erro ao pesquisar Evento de Limpeza pelo ID!"
 *
 * /eco-kitoto/evento-limpeza/responsavel/{usuario}:
 *   get:
 *     summary: Pesquisar eventos de limpeza pelo usuário responsável
 *     tags:
 *       - CLEAR_EVENT
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - name: usuario
 *         in: path
 *         required: true
 *         description: Nome do usuário responsável pelo evento
 *         schema:
 *           type: string
 *         example: "João Silva"
 *     responses:
 *       200:
 *         description: Eventos encontrados para o usuário informado.
 *       400:
 *         description: Usuário não possui eventos associados.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Este usuário não está relacionado com nenhum evento de Limpeza!"
 *       500:
 *         description: Erro ao pesquisar os eventos por responsável.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Erro ao pesquisar os Eventos de Limpeza relacionado com este usuario!"
 *
 * /eco-kitoto/evento-limpeza/bairro/{bairro}:
 *   get:
 *     summary: Pesquisar eventos de limpeza por bairro/localidade
 *     tags:
 *       - CLEAR_EVENT
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - name: bairro
 *         in: path
 *         required: true
 *         description: Nome do bairro ou localidade do evento
 *         schema:
 *           type: string
 *         example: "Maianga"
 *     responses:
 *       200:
 *         description: Eventos de limpeza encontrados na localidade.
 *       400:
 *         description: Nenhum evento encontrado para esta localidade.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Evento de Limpeza não encontrado!"
 *       500:
 *         description: Erro ao pesquisar eventos por bairro.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Erro ao pesquisar Evento de Limpeza pelo bairro!"
 *
 * /eco-kitoto/evento-limpeza/horas/{horas}:
 *   get:
 *     summary: Pesquisar eventos de limpeza pelo horário
 *     tags:
 *       - CLEAR_EVENT
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - name: horas
 *         in: path
 *         required: true
 *         description: Horário do evento (exemplo hh:mm)
 *         schema:
 *           type: string
 *         example: "08:30"
 *     responses:
 *       200:
 *         description: Eventos encontrados para o horário fornecido.
 *       400:
 *         description: Nenhum evento encontrado para as horas informadas.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Eventos de Limpeza não encontrados!"
 *       500:
 *         description: Erro ao pesquisar eventos por horas.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Erro ao pesquisar Eventos de Limpeza pelas horas!"
 *
 * /eco-kitoto/evento-limpeza/status/{status}:
 *   get:
 *     summary: Pesquisar eventos de limpeza pelo status
 *     tags:
 *       - CLEAR_EVENT
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - name: status
 *         in: path
 *         required: true
 *         description: Status do evento de limpeza
 *         schema:
 *           type: string
 *         example: "PENDENTE"
 *     responses:
 *       200:
 *         description: Eventos encontrados com o status especificado.
 *       400:
 *         description: Nenhum evento encontrado com esse status.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Eventos de Limpeza não encontrado!"
 *       500:
 *         description: Erro ao pesquisar eventos pelo status.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Erro ao pesquisar Eventos de Limpeza pelo status!"
 *
 * /eco-kitoto/evento-limpeza/data/{data}:
 *   get:
 *     summary: Pesquisar eventos de limpeza pela data
 *     tags:
 *       - CLEAR_EVENT
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - name: data
 *         in: path
 *         required: true
 *         description: Data do evento (formato yyyy-MM-dd ou yyyy/MM/dd)
 *         schema:
 *           type: string
 *         example: "2026-08-25"
 *     responses:
 *       200:
 *         description: Eventos de limpeza encontrados na data indicada.
 *       400:
 *         description: Nenhum evento encontrado na data especificada.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Evento de Limpeza não encontrado!"
 *       500:
 *         description: Erro ao pesquisar eventos por data.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Erro ao pesquisar Eventos de Limpeza pela data!"
 */

//list all clear event
    clearEventRouter.get("/evento-limpeza", authenticatedMiddleware, clearEventController.listAllEvent)
//create
    clearEventRouter.post("/evento-limpeza/novo", authenticatedMiddleware, checkRoleMiddleware(['Administrador','Administradora', 'Voluntário', 'Voluntária']), clearEventController.create)
//update
    clearEventRouter.patch("/evento-limpeza/editar/:id", authenticatedMiddleware, checkRoleMiddleware(['Administrador','Administradora', 'Voluntário', 'Voluntária']), clearEventController.update)
//delete
    clearEventRouter.delete("/evento-limpeza/eliminar/:id", authenticatedMiddleware, checkRoleMiddleware(['Administrador','Administradora']), clearEventController.delete)
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