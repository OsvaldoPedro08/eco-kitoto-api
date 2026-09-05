import { Router } from "express";
import { RelatoryController } from "../controllers/relatoryController";
import { authenticatedMiddleware } from "../middlewares/authenticatedMiddleware";
import { checkRoleMiddleware } from "../middlewares/checkRoleMiddleware";

const relatoryRouter = Router()
const relatoryController = new RelatoryController

/**
 * @openapi
 * /eco-kitoto/relatorios:
 *   get:
 *     summary: Listar todos os relatórios
 *     tags:
 *       - RELATORY
 *     security:
 *       - cookieAuth: []
 *     responses:
 *       200:
 *         description: Lista de relatórios retornada com sucesso.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   idrelatory:
 *                     type: string
 *                     example: "9b1deb4d-3b7d-41b9-9189-e82200c45601"
 *                   eventId:
 *                     type: string
 *                     example: "9b1deb4d-3b7d-41b9-9189-e82200c06583"
 *                   before_image:
 *                     type: string
 *                     example: "https://res.cloudinary.com/demo/image/upload/v1234/before.jpg"
 *                   after_image:
 *                     type: string
 *                     example: "https://res.cloudinary.com/demo/image/upload/v1234/after.jpg"
 *                   observation:
 *                     type: string
 *                     example: "Ação concluída com sucesso."
 *                   sendDate:
 *                     type: string
 *                     example: "2026-05-20T12:00:00.000Z"
 *       500:
 *         description: Erro ao listar os relatórios.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Erro ao listar relatórios!"
 *
 * /eco-kitoto/relatorios/novo:
 *   post:
 *     summary: Criar um novo relatório
 *     tags:
 *       - RELATORY
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
 *               - before_image
 *               - after_image
 *             properties:
 *               eventId:
 *                 type: string
 *                 example: "9b1deb4d-3b7d-41b9-9189-e82200c06583"
 *               before_image:
 *                 type: string
 *                 example: "https://res.cloudinary.com/demo/image/upload/v1234/before.jpg"
 *               after_image:
 *                 type: string
 *                 example: "https://res.cloudinary.com/demo/image/upload/v1234/after.jpg"
 *               observation:
 *                 type: string
 *                 example: "Área limpa e recolhida."
 *     responses:
 *       200:
 *         description: Relatório salvo com sucesso ou mensagem de validação.
 *         content:
 *           application/json:
 *             schema:
 *               oneOf:
 *                 - type: object
 *                   properties:
 *                     idrelatory:
 *                       type: string
 *                       example: "9b1deb4d-3b7d-41b9-9189-e82200c45601"
 *                     eventId:
 *                       type: string
 *                       example: "9b1deb4d-3b7d-41b9-9189-e82200c06583"
 *                     before_image:
 *                       type: string
 *                       example: "https://res.cloudinary.com/demo/image/upload/v1234/before.jpg"
 *                     after_image:
 *                       type: string
 *                       example: "https://res.cloudinary.com/demo/image/upload/v1234/after.jpg"
 *                     observation:
 *                       type: string
 *                       example: "Área limpa e recolhida."
 *                 - type: object
 *                   properties:
 *                     message:
 *                       type: string
 *                       example: "Preencha os campos obrigatórios!"
 *       500:
 *         description: Erro ao salvar o relatório.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Erro ao salvar relatório!"
 *
 * /eco-kitoto/relatorios/editar/{id}:
 *   patch:
 *     summary: Atualizar dados de um relatório
 *     tags:
 *       - RELATORY
 *     security:
 *       - cookieAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - id
 *               - eventId
 *               - before_image
 *               - after_image
 *             properties:
 *               id:
 *                 type: string
 *                 example: "9b1deb4d-3b7d-41b9-9189-e82200c45601"
 *               eventId:
 *                 type: string
 *                 example: "9b1deb4d-3b7d-41b9-9189-e82200c06583"
 *               before_image:
 *                 type: string
 *                 example: "https://res.cloudinary.com/demo/image/upload/v1234/before.jpg"
 *               after_image:
 *                 type: string
 *                 example: "https://res.cloudinary.com/demo/image/upload/v1234/after.jpg"
 *               observation:
 *                 type: string
 *                 example: "Observação atualizada."
 *     responses:
 *       200:
 *         description: Relatório atualizado com sucesso ou mensagem de validação.
 *         content:
 *           application/json:
 *             schema:
 *               oneOf:
 *                 - type: object
 *                   properties:
 *                     idrelatory:
 *                       type: string
 *                       example: "9b1deb4d-3b7d-41b9-9189-e82200c45601"
 *                     eventId:
 *                       type: string
 *                       example: "9b1deb4d-3b7d-41b9-9189-e82200c06583"
 *                     before_image:
 *                       type: string
 *                       example: "https://res.cloudinary.com/demo/image/upload/v1234/before.jpg"
 *                     after_image:
 *                       type: string
 *                       example: "https://res.cloudinary.com/demo/image/upload/v1234/after.jpg"
 *                     observation:
 *                       type: string
 *                       example: "Observação atualizada."
 *                 - type: object
 *                   properties:
 *                     message:
 *                       type: string
 *                       example: "Relatório não encontrado!"
 *                 - type: object
 *                   properties:
 *                     message:
 *                       type: string
 *                       example: "Preencha os campos obrigatórios!"
 *       500:
 *         description: Erro ao atualizar o relatório.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Erro ao atualizar relatório!"
 *
 * /eco-kitoto/relatorios/eliminar/{id}:
 *   delete:
 *     summary: Eliminar um relatório pelo ID
 *     tags:
 *       - RELATORY
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID do relatório a eliminar
 *         schema:
 *           type: string
 *         example: "9b1deb4d-3b7d-41b9-9189-e82200c45601"
 *     responses:
 *       200:
 *         description: Resposta com o estado da eliminação do relatório.
 *         content:
 *           application/json:
 *             schema:
 *               oneOf:
 *                 - type: object
 *                   properties:
 *                     message:
 *                       type: string
 *                       example: "Relatório eliminado com sucesso!"
 *                 - type: object
 *                   properties:
 *                     message:
 *                       type: string
 *                       example: "Relatório não encontrado ou não existe!"
 *       500:
 *         description: Erro ao eliminar o relatório.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Erro ao eliminar o relatório!"
 * 
 * /eco-kitoto/relatorios/{id}:
 *   get:
 *     summary: Pesquisar relatório pelo ID do relatório
 *     tags:
 *       - RELATORY
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID do relatório a pesquisar
 *         schema:
 *           type: string
 *         example: "9b1deb4d-3b7d-41b9-9189-e82200c45601"
 *     responses:
 *       200:
 *         description: Relatório encontrado ou mensagem de erro.
 *         content:
 *           application/json:
 *             schema:
 *               oneOf:
 *                 - type: object
 *                   properties:
 *                     idrelatory:
 *                       type: string
 *                       example: "9b1deb4d-3b7d-41b9-9189-e82200c45601"
 *                     eventId:
 *                       type: string
 *                       example: "9b1deb4d-3b7d-41b9-9189-e82200c06583"
 *                     before_image:
 *                       type: string
 *                       example: "https://res.cloudinary.com/demo/image/upload/v1234/before.jpg"
 *                     after_image:
 *                       type: string
 *                       example: "https://res.cloudinary.com/demo/image/upload/v1234/after.jpg"
 *                     observation:
 *                       type: string
 *                       example: "Ação concluída."
 *                 - type: object
 *                   properties:
 *                     message:
 *                       type: string
 *                       example: "Relatório não encontrado!"
 *       500:
 *         description: Erro ao pesquisar relatório pelo ID.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Erro ao pesquisar relatório pelo ID!"
 *
 * /eco-kitoto/relatorios/evento/{event}:
 *   get:
 *     summary: Pesquisar relatórios pelo ID do evento
 *     tags:
 *       - RELATORY
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - name: event
 *         in: path
 *         required: true
 *         description: ID do evento associado
 *         schema:
 *           type: string
 *         example: "9b1deb4d-3b7d-41b9-9189-e82200c06583"
 *     responses:
 *       200:
 *         description: Relatórios encontrados ou mensagem de erro.
 *         content:
 *           application/json:
 *             schema:
 *               oneOf:
 *                 - type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       idrelatory:
 *                         type: string
 *                         example: "9b1deb4d-3b7d-41b9-9189-e82200c45601"
 *                       eventId:
 *                         type: string
 *                         example: "9b1deb4d-3b7d-41b9-9189-e82200c06583"
 *                       before_image:
 *                         type: string
 *                         example: "https://res.cloudinary.com/demo/image/upload/v1234/before.jpg"
 *                       after_image:
 *                         type: string
 *                         example: "https://res.cloudinary.com/demo/image/upload/v1234/after.jpg"
 *                       observation:
 *                         type: string
 *                         example: "Ação concluída."
 *                 - type: object
 *                   properties:
 *                     message:
 *                       type: string
 *                       example: "Relatório não encontrado!"
 *       500:
 *         description: Erro ao pesquisar relatório pelo evento.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Erro ao pesquisar relatório pelo ID!"
 *
 * /eco-kitoto/relatorios/data-envio/{date}:
 *   get:
 *     summary: Pesquisar relatórios pela data de envio
 *     tags:
 *       - RELATORY
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - name: date
 *         in: path
 *         required: true
 *         description: 'Data no formato aceito (ex: YYYY-MM-DD)'
 *         schema:
 *           type: string
 *         example: "2026-05-20"
 *     responses:
 *       200:
 *         description: Relatórios encontrados ou mensagem de erro.
 *         content:
 *           application/json:
 *             schema:
 *               oneOf:
 *                 - type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       idrelatory:
 *                         type: string
 *                         example: "9b1deb4d-3b7d-41b9-9189-e82200c45601"
 *                       eventId:
 *                         type: string
 *                         example: "9b1deb4d-3b7d-41b9-9189-e82200c06583"
 *                       before_image:
 *                         type: string
 *                         example: "https://res.cloudinary.com/demo/image/upload/v1234/before.jpg"
 *                       after_image:
 *                         type: string
 *                         example: "https://res.cloudinary.com/demo/image/upload/v1234/after.jpg"
 *                       observation:
 *                         type: string
 *                         example: "Ação concluída."
 *                 - type: object
 *                   properties:
 *                     message:
 *                       type: string
 *                       example: "Relatório não encontrado!"
 *       500:
 *         description: Erro ao pesquisar relatório pela data.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Erro ao pesquisar relatório pela data!"
 */


//list all
    relatoryRouter.get("/relatorios", authenticatedMiddleware, relatoryController.listAll)
//create
    relatoryRouter.post("/relatorios/novo", authenticatedMiddleware, checkRoleMiddleware(['Administrador','Administradora']), relatoryController.create)
//update
    relatoryRouter.patch("/relatorios/editar/:id", authenticatedMiddleware, checkRoleMiddleware(['Administrador','Administradora']), relatoryController.update)
//delete
    relatoryRouter.delete("/relatorios/eliminar/:id", authenticatedMiddleware, checkRoleMiddleware(['Administrador','Administradora']), relatoryController.delete)
//search by id
    relatoryRouter.get("/relatorios/:id", authenticatedMiddleware, relatoryController.searchRelatoryById)
//search by event id
    relatoryRouter.get("/relatorios/evento/:event", authenticatedMiddleware, relatoryController.searchRelatoryByEventId)
//search by send date
    relatoryRouter.get("/relatorios/data-envio/:date", authenticatedMiddleware, relatoryController.searchRelatoryBySendDate)

export { relatoryRouter }