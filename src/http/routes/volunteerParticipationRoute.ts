import { Router } from "express";
import { VolunteerParticipationController } from "../controllers/volunteerParticipationController";
import { authenticatedMiddleware } from "../middlewares/authenticatedMiddleware";
import { checkRoleMiddleware } from "../middlewares/checkRoleMiddleware";

const volunteerRouter = Router()
const volunteerController = new VolunteerParticipationController()

/**
 * @openapi
 * /eco-kitoto/voluntarios:
 *   get:
 *     summary: Listar todas as participações de voluntários
 *     tags:
 *       - VOLUNTEERS
 *     security:
 *       - cookieAuth: []
 *     responses:
 *       200:
 *         description: Lista de participações retornada com sucesso.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   idparticipation:
 *                     type: string
 *                     example: "9b1deb4d-3b7d-41b9-9189-e82200c01333"
 *                   eventId:
 *                     type: string
 *                     example: "9b1deb4d-3b7d-41b9-9189-e82999c01401"
 *                   volunteerId:
 *                     type: string
 *                     example: "usr-99999"
 *                   pontuation:
 *                     type: number
 *                     example: 50
 *                   estatus:
 *                     type: string
 *                     example: "Pendente"
 *       500:
 *         description: Erro ao listar os voluntários.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Erro ao listar Voluntários!"
 *
 * /eco-kitoto/voluntarios/novo:
 *   post:
 *     summary: Registar participação de voluntário num evento
 *     tags:
 *       - VOLUNTEERS
 *     security:
 *       - cookieAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - eventId
 *             properties:
 *               eventId:
 *                 type: string
 *                 example: "9b1deb4d-3b7d-41b9-9189-e82999c01401"
 *               pontuation:
 *                 type: number
 *                 example: 10
 *               estatus:
 *                 type: string
 *                 example: "Pendente"
 *     responses:
 *       200:
 *         description: Participação registada com sucesso.
 *         content:
 *           application/json:
 *             schema:
 *               oneOf:
 *                 - type: object
 *                   properties:
 *                     idparticipation:
 *                       type: string
 *                       example: "9b1deb4d-3b7d-41b9-9189-e82200c01333"
 *                     eventId:
 *                       type: string
 *                       example: "9b1deb4d-3b7d-41b9-9189-e82999c01401"
 *                     volunteerId:
 *                       type: string
 *                       example: "usr-99999"
 *                     pontuation:
 *                       type: number
 *                       example: 10
 *                     estatus:
 *                       type: string
 *                       example: "Pendente"
 *                 - type: object
 *                   properties:
 *                     message:
 *                       type: string
 *                       example: "Pedido de participação inválido!"
 *       500:
 *         description: Erro ao processar o registo ou escassez de vagas.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Não há mais vagas para este Evento de Limpeza!"
 *
 * /eco-kitoto/voluntarios/eliminar/{id}:
 *   delete:
 *     summary: Cancelar/eliminar participação num evento pelo ID da participação
 *     tags:
 *       - VOLUNTEERS
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID da participação do voluntário
 *         schema:
 *           type: string
 *         example: "9b1deb4d-3b7d-41b9-9189-e82200c01333"
 *     responses:
 *       200:
 *         description: Participação cancelada com sucesso.
 *         content:
 *           application/json:
 *             schema:
 *               oneOf:
 *                 - type: object
 *                   properties:
 *                     message:
 *                       type: string
 *                       example: "Deixaste de participar do Evento de Limpezal"
 *                 - type: object
 *                   properties:
 *                     message:
 *                       type: string
 *                       example: "Não foi encontrado nenhum evento onde participaste!"
 *       500:
 *         description: Erro interno ao eliminar participação.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Erro ao eliminar participação em evento!"
 * 
 * /eco-kitoto//voluntarios/pontuacao/{id}:
 *   patch:
 *     summary: Atualizar pontuação do voluntário pelo ID da participação
 *     tags:
 *       - VOLUNTEERS
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID da participação
 *         schema:
 *           type: string
 *         example: "9b1deb4d-3b7d-41b9-9189-e82200c01333"
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - pontuation
 *             properties:
 *               pontuation:
 *                 type: number
 *                 example: 25
 *     responses:
 *       200:
 *         description: Pontuação atualizada ou mensagem de validação.
 *         content:
 *           application/json:
 *             schema:
 *               oneOf:
 *                 - type: object
 *                   properties:
 *                     message:
 *                       type: string
 *                       example: "Pontuação do voluntário atualizada com sucesso!"
 *                 - type: object
 *                   properties:
 *                     message:
 *                       type: string
 *                       example: "Evento não encontrado!"
 *                 - type: object
 *                   properties:
 *                     message:
 *                       type: string
 *                       example: "Pontuação inválida. Por favor, insira um valor superior a zero!"
 *       500:
 *         description: Erro ao atualizar a pontuação do voluntário.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Erro ao atualizar a pontuação do voluntário!"
 * 
 * /eco-kitoto/voluntarios/participacoes/{id}:
 *   get:
 *     summary: Pesquisar participações pelo ID da participação
 *     tags:
 *       - VOLUNTEERS
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID da participação
 *         schema:
 *           type: string
 *         example: "9b1deb4d-3b7d-41b9-9189-e82200c01333"
 *     responses:
 *       200:
 *         description: Dados da participação retornados ou mensagem de validação.
 *         content:
 *           application/json:
 *             schema:
 *               oneOf:
 *                 - type: object
 *                   properties:
 *                     idparticipation:
 *                       type: string
 *                       example: "9b1deb4d-3b7d-41b9-9189-e82200c01333"
 *                     eventId:
 *                       type: string
 *                       example: "9b1deb4d-3b7d-41b9-9189-e82999c01401"
 *                     volunteerId:
 *                       type: string
 *                       example: "usr-99999"
 *                     pontuation:
 *                       type: number
 *                       example: 50
 *                     estatus:
 *                       type: string
 *                       example: "Concluído"
 *                 - type: object
 *                   properties:
 *                     message:
 *                       type: string
 *                       example: "Não foi encontrado nenhum evento em que estejas a participar"
 *       500:
 *         description: Erro ao pesquisar evento de participação.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Erro ao pesquisar evento onde participaste ou estejas participando!"
 *
 * /eco-kitoto/voluntarios/minha_participacao/{id}:
 *   get:
 *     summary: Pesquisar participações pelo ID do voluntário
 *     tags:
 *       - VOLUNTEERS
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID do voluntário (utilizador)
 *         schema:
 *           type: string
 *         example: "usr-99999"
 *     responses:
 *       200:
 *         description: Lista de participações do voluntário ou mensagem de validação.
 *         content:
 *           application/json:
 *             schema:
 *               oneOf:
 *                 - type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       idparticipation:
 *                         type: string
 *                         example: "9b1deb4d-3b7d-41b9-9189-e82200c01333"
 *                       eventId:
 *                         type: string
 *                         example: "9b1deb4d-3b7d-41b9-9189-e82999c01401"
 *                       volunteerId:
 *                         type: string
 *                         example: "usr-99999"
 *                       pontuation:
 *                         type: number
 *                         example: 30
 *                       estatus:
 *                         type: string
 *                         example: "Pendente"
 *                 - type: object
 *                   properties:
 *                     message:
 *                       type: string
 *                       example: "Voluntário não encontrado!"
 *       500:
 *         description: Erro ao pesquisar participações por ID de voluntário.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Erro ao pesquisar Evento onde participaste ou estejas participando!"
 */

//list all
    volunteerRouter.get("/voluntarios", authenticatedMiddleware, checkRoleMiddleware(['Administrador','Administradora']), volunteerController.listAll)
//create
    volunteerRouter.post("/voluntarios/novo", authenticatedMiddleware, checkRoleMiddleware(['Voluntário','Voluntária']), volunteerController.create)
//delete
    volunteerRouter.delete("/voluntarios/eliminar/:id", authenticatedMiddleware, checkRoleMiddleware(['Voluntário','Voluntária']), volunteerController.delete)
//pontuationUpdate
    volunteerRouter.patch("/voluntarios/pontuacao/:id", authenticatedMiddleware, checkRoleMiddleware(['Administrador','Administradora']), volunteerController.pontuationUpdate)
//search participation by id participation
    volunteerRouter.get("/voluntarios/participacoes/:id", authenticatedMiddleware, checkRoleMiddleware(['Administrador','Administradora']), volunteerController.searchParticipationById)
//search participation by volunteer id
    volunteerRouter.get("/voluntarios/minha_participacao/:id", authenticatedMiddleware, checkRoleMiddleware(['Voluntário','Voluntária']), volunteerController.searchByVolunteerId)

export { volunteerRouter }