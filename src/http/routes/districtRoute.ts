import { Router } from "express";
import { DistrictController } from "../controllers/districtController";
import { authenticatedMiddleware } from "../middlewares/authenticatedMiddleware";
import { checkRoleMiddleware } from "../middlewares/checkRoleMiddleware";

const districtRouter = Router()
const districtController = new DistrictController()

/**
 * @openapi
 * /eco-kitoto/distrito:
 *   get:
 *     summary: Listar todos os distritos
 *     tags:
 *       - DISTRICT
 *     security:
 *       - cookieAuth: []
 *     responses:
 *       200:
 *         description: Lista de distritos retornada com sucesso.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                     example: "9b1deb4d-3b7d-41b9-9189-e82200c014023"
 *                   name:
 *                     type: string
 *                     example: "Samba"
 *                   municipalityId:
 *                     type: string
 *                     example: "9b1deb4d-3b7d-41b9-9189-e82200c01400"
 *       500:
 *         description: Erro ao listar distritos.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Erro ao listar distritos!"
 *
 * /eco-kitoto/distrito/novo:
 *   post:
 *     summary: Criar um novo distrito
 *     tags:
 *       - DISTRICT
 *     security:
 *       - cookieAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - municipalityId
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Samba"
 *               municipalityId:
 *                 type: string
 *                 example: "9b1deb4d-3b7d-41b9-9189-e82200c01400"
 *     responses:
 *       200:
 *         description: Distrito criado com sucesso.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   example: "9b1deb4d-3b7d-41b9-9189-e82200c014023"
 *                 name:
 *                   type: string
 *                   example: "Samba"
 *                 municipalityId:
 *                   type: string
 *                   example: "9b1deb4d-3b7d-41b9-9189-e82200c01400"
 *       400:
 *         description: Campos inválidos fornecidos.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Campos inválidos!"
 *       500:
 *         description: Erro ao salvar distrito.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Erro ao salvar distrito!"
 *
 * /eco-kitoto/distrito/editar/{id}:
 *   patch:
 *     summary: Atualizar dados de um distrito
 *     tags:
 *       - DISTRICT
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID do distrito a atualizar
 *         schema:
 *           type: string
 *         example: "9b1deb4d-3b7d-41b9-9189-e82200c014023"
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - municipalityId
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Maianga"
 *               municipalityId:
 *                 type: string
 *                 example: "9b1deb4d-3b7d-41b9-9189-e82200c01400"
 *     responses:
 *       200:
 *         description: Distrito atualizado com sucesso.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   example: "9b1deb4d-3b7d-41b9-9189-e82200c014023"
 *                 name:
 *                   type: string
 *                   example: "Maianga"
 *                 municipalityId:
 *                   type: string
 *                   example: "9b1deb4d-3b7d-41b9-9189-e82200c01400"
 *       400:
 *         description: Campos inválidos fornecidos.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Campos inválidos!"
 *       500:
 *         description: Erro ao atualizar os dados do distrito.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Erro ao atualizar os dados do distrito!"
 *
 * /eco-kitoto/distrito/eliminar/{id}:
 *   delete:
 *     summary: Eliminar um distrito
 *     tags:
 *       - DISTRICT
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID do distrito a eliminar
 *         schema:
 *           type: string
 *         example: "9b1deb4d-3b7d-41b9-9189-e82200c014023"
 *     responses:
 *       200:
 *         description: Distrito eliminado com sucesso.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Distrito eliminado com sucesso!"
 *       400:
 *         description: Município/Distrito não encontrado.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Município não encontrado!"
 *       500:
 *         description: Erro ao eliminar distrito.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Erro ao eliminar distrito!"
 *
 * /eco-kitoto/distrito/{name}:
 *   get:
 *     summary: Pesquisar distrito pelo nome
 *     tags:
 *       - DISTRICT
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - name: name
 *         in: path
 *         required: true
 *         description: Nome do distrito a pesquisar
 *         schema:
 *           type: string
 *         example: "Samba"
 *     responses:
 *       200:
 *         description: Distrito encontrado com sucesso.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   example: "9b1deb4d-3b7d-41b9-9189-e82200c014023"
 *                 name:
 *                   type: string
 *                   example: "Samba"
 *                 municipalityId:
 *                   type: string
 *                   example: "9b1deb4d-3b7d-41b9-9189-e82200c01400"
 *       400:
 *         description: Nome do distrito inválido.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Nome inválido!"
 *       500:
 *         description: Erro ao pesquisar distrito pelo nome.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Erro ao pesquisar distrito!"
 */


//listAll
    districtRouter.get("/distrito", authenticatedMiddleware, districtController.listAll)
//insert
    districtRouter.post("/distrito/novo", authenticatedMiddleware, checkRoleMiddleware(['Administrador','Administradora']), districtController.create)
//update
    districtRouter.patch("/distrito/editar/:id", authenticatedMiddleware, checkRoleMiddleware(['Administrador','Administradora']), districtController.update)
//delete
    districtRouter.delete("/distrito/eliminar/:id", authenticatedMiddleware, checkRoleMiddleware(['Administrador','Administradora']), districtController.delete)
//search by name of district
    districtRouter.get("/distrito/:name", authenticatedMiddleware, districtController.searchByName)

export { districtRouter }