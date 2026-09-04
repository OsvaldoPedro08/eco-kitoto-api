import { Router } from "express";
import { ProvinceController } from "../controllers/provinceController";
import { authenticatedMiddleware } from "../middlewares/authenticatedMiddleware";
import { checkRoleMiddleware } from "../middlewares/checkRoleMiddleware";

const provinceRouter = Router()
const provinceController = new ProvinceController()

/**
 * @openapi
 * /eco-kitoto/provincia:
 *   get:
 *     summary: Listar todas as províncias
 *     tags:
 *       - PROVINCE
 *     security:
 *       - cookieAuth: []
 *     responses:
 *       200:
 *         description: Lista de províncias retornada com sucesso.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                     example: "9b1deb4d-3b7d-41b9-9189-e82200c01401"
 *                   name:
 *                     type: string
 *                     example: "Cuanza Norte"
 *       500:
 *         description: Erro ao listar as províncias.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Erro ao listar as províncias!"
 *
 * /eco-kitoto/provincia/nova:
 *   post:
 *     summary: Cadastrar uma nova província
 *     tags:
 *       - PROVINCE
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
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Cuanza Norte"
 *     responses:
 *       200:
 *         description: Província cadastrada com sucesso ou mensagem de erro de validação.
 *         content:
 *           application/json:
 *             schema:
 *               oneOf:
 *                 - type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                       example: "9b1deb4d-3b7d-41b9-9189-e82200c01401"
 *                     name:
 *                       type: string
 *                       example: "Cuanza Norte"
 *                 - type: object
 *                   properties:
 *                     message:
 *                       type: string
 *                       example: "Preencha os campos para salvar!"
 *       500:
 *         description: Erro ao salvar a província.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Erro ao salvar província."
 *
 * /eco-kitoto/provincia/editar/{id}:
 *   patch:
 *     summary: Atualizar dados de uma província
 *     tags:
 *       - PROVINCE
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID da província a ser atualizada
 *         schema:
 *           type: string
 *         example: "9b1deb4d-3b7d-41b9-9189-e82200c01401"
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Luanda"
 *     responses:
 *       200:
 *         description: Província atualizada com sucesso ou mensagem de erro de validação.
 *         content:
 *           application/json:
 *             schema:
 *               oneOf:
 *                 - type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                       example: "9b1deb4d-3b7d-41b9-9189-e82200c01401"
 *                     name:
 *                       type: string
 *                       example: "Luanda"
 *                 - type: object
 *                   properties:
 *                     message:
 *                       type: string
 *                       example: "A província não existe!"
 *       500:
 *         description: Erro ao atualizar a província.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Erro ao atualizar a província!"
 *
 * /eco-kitoto/provincia/eliminar/{id}:
 *   delete:
 *     summary: Eliminar uma província
 *     tags:
 *       - PROVINCE
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID da província a eliminar
 *         schema:
 *           type: string
 *         example: "9b1deb4d-3b7d-41b9-9189-e82200c01401"
 *     responses:
 *       200:
 *         description: Resposta com o estado da eliminação da província.
 *         content:
 *           application/json:
 *             schema:
 *               oneOf:
 *                 - type: object
 *                   properties:
 *                     message:
 *                       type: string
 *                       example: "Província eliminada com sucesso!"
 *                 - type: object
 *                   properties:
 *                     message:
 *                       type: string
 *                       example: "Província não encontrada!"
 *       500:
 *         description: Erro ao eliminar a província.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Erro ao eliminar província!"
 *
 * /eco-kitoto/provincia/{name}:
 *   get:
 *     summary: Pesquisar província pelo nome
 *     tags:
 *       - PROVINCE
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - name: name
 *         in: path
 *         required: true
 *         description: Nome ou trecho do nome da província a pesquisar
 *         schema:
 *           type: string
 *         example: "Cuanza Norte"
 *     responses:
 *       200:
 *         description: Resultado da pesquisa da província ou mensagem de erro/validação.
 *         content:
 *           application/json:
 *             schema:
 *               oneOf:
 *                 - type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: string
 *                         example: "9b1deb4d-3b7d-41b9-9189-e82200c01401"
 *                       name:
 *                         type: string
 *                         example: "Cuanza Norte"
 *                 - type: object
 *                   properties:
 *                     message:
 *                       type: string
 *                       example: "Província não encontrada!"
 *       500:
 *         description: Erro ao pesquisar a província.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Erro ao pesquisar província!"
 */

//list all
    provinceRouter.get("/provincia", authenticatedMiddleware, provinceController.listAll)

//save
    provinceRouter.post("/provincia/nova", authenticatedMiddleware, checkRoleMiddleware(['Administrador','Administradora']), provinceController.create)

//update
    provinceRouter.patch("/provincia/editar/:id", authenticatedMiddleware, checkRoleMiddleware(['Administrador','Administradora']), provinceController.update)

//delete
    provinceRouter.delete("/provincia/eliminar/:id", authenticatedMiddleware, checkRoleMiddleware(['Administrador','Administradora']), provinceController.delete)

//search province by name
    provinceRouter.get("/provincia/:name", authenticatedMiddleware, provinceController.searchByName)

export { provinceRouter }