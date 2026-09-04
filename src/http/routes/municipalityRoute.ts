import { Router } from "express";
import { MunicipalityController } from "../controllers/municipalityController";
import { authenticatedMiddleware } from "../middlewares/authenticatedMiddleware";
import { checkRoleMiddleware } from "../middlewares/checkRoleMiddleware";

const municipalityRouter = Router()
const municipalityController = new MunicipalityController()

/**
 * @openapi
 * /eco-kitoto/municipio:
 *   get:
 *     summary: Listar todos os municípios
 *     tags:
 *       - MUNICIPALITY
 *     security:
 *       - cookieAuth: []
 *     responses:
 *       200:
 *         description: Lista de municípios retornada com sucesso.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                     example: "9b1deb4d-3b7d-41b9-9189-e82211c01401"
 *                   name:
 *                     type: string
 *                     example: "Cazengo"
 *                   provinceId:
 *                     type: string
 *                     example: "9b1deb4d-3b7d-41b9-9189-a23200c01401"
 *       500:
 *         description: Erro ao listar os municípios.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Erro ao listar municípios!"
 *
 * /eco-kitoto/municipio/novo:
 *   post:
 *     summary: Cadastrar um novo município
 *     tags:
 *       - MUNICIPALITY
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
 *               - provinceId
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Cazengo"
 *               provinceId:
 *                 type: string
 *                 example: "9b1deb4d-3b7d-41b9-9189-e82200c01401"
 *     responses:
 *       200:
 *         description: Município cadastrado com sucesso.
 *         content:
 *           application/json:
 *             schema:
 *               oneOf:
 *                 - type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                       example: "9b1deb4d-3b7d-41b9-9189-e82211c01401"
 *                     name:
 *                       type: string
 *                       example: "Cazengo"
 *                     provinceId:
 *                       type: string
 *                       example: "9b1deb4d-3b7d-41b9-9189-e82200c01401"
 *                 - type: object
 *                   properties:
 *                     message:
 *                       type: string
 *                       example: "Preencha todos os campos para salvar!"
 *       500:
 *         description: Erro ao salvar o município.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Erro ao salvar o município!"
 *
 * /eco-kitoto/municipio/editar/{id}:
 *   patch:
 *     summary: Atualizar dados de um município
 *     tags:
 *       - MUNICIPALITY
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID do município a ser atualizado
 *         schema:
 *           type: string
 *         example: "9b1deb4d-3b7d-41b9-9189-e82211c01401"
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - provinceId
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Cambambe"
 *               provinceId:
 *                 type: string
 *                 example: "9b1deb4d-3b7d-41b9-9189-e82200c01401"
 *     responses:
 *       200:
 *         description: Município atualizado com sucesso ou mensagem de erro de validação.
 *         content:
 *           application/json:
 *             schema:
 *               oneOf:
 *                 - type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                       example: "9b1deb4d-3b7d-41b9-9189-e82211c01401"
 *                     name:
 *                       type: string
 *                       example: "Cambambe"
 *                     provinceId:
 *                       type: string
 *                       example: "9b1deb4d-3b7d-41b9-9189-e82200c01401"
 *                 - type: object
 *                   properties:
 *                     message:
 *                       type: string
 *                       example: "Preencha os campos antes de continuar"
 *       500:
 *         description: Erro ao atualizar os dados do município.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Erro ao atualizar dados do município!"
 *
 * /eco-kitoto/municipio/eliminar/{id}:
 *   delete:
 *     summary: Eliminar um município
 *     tags:
 *       - MUNICIPALITY
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID do município a eliminar
 *         schema:
 *           type: string
 *         example: "9b1deb4d-3b7d-41b9-9189-e82211c01401"
 *     responses:
 *       200:
 *         description: Resposta com o estado da eliminação do município.
 *         content:
 *           application/json:
 *             schema:
 *               oneOf:
 *                 - type: object
 *                   properties:
 *                     message:
 *                       type: string
 *                       example: "Município eliminado com sucesso!"
 *                 - type: object
 *                   properties:
 *                     message:
 *                       type: string
 *                       example: "Município não encontrado!"
 *       500:
 *         description: Erro ao eliminar o município.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Erro ao eliminar município!"
 *
 * /eco-kitoto/municipio/{name}:
 *   get:
 *     summary: Pesquisar município pelo nome
 *     tags:
 *       - MUNICIPALITY
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - name: name
 *         in: path
 *         required: true
 *         description: Nome ou trecho do nome do município a pesquisar
 *         schema:
 *           type: string
 *         example: "Cazengo"
 *     responses:
 *       200:
 *         description: Resultado da pesquisa do município ou mensagem de validação.
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
 *                         example: "9b1deb4d-3b7d-41b9-9189-e82211c01401"
 *                       name:
 *                         type: string
 *                         example: "Cazengo"
 *                       provinceId:
 *                         type: string
 *                         example: "9b1deb4d-3b7d-41b9-9189-e82200c01401"
 *                 - type: object
 *                   properties:
 *                     message:
 *                       type: string
 *                       example: "Município não enocntrado!"
 *       500:
 *         description: Erro ao pesquisar município.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Erro ao pesquisar município!"
 */


//list all
    municipalityRouter.get("/municipio", authenticatedMiddleware, municipalityController.listAll)
//create
    municipalityRouter.post("/municipio/novo", authenticatedMiddleware, checkRoleMiddleware(['Administrador','Administradora']), municipalityController.create)
//update
    municipalityRouter.patch("/municipio/editar/:id", authenticatedMiddleware, checkRoleMiddleware(['Administrador','Administradora']), municipalityController.update)
//delete
    municipalityRouter.delete("/municipio/eliminar/:id", authenticatedMiddleware, checkRoleMiddleware(['Administrador','Administradora']), municipalityController.delete)
//search by name of municipality
    municipalityRouter.get("/municipio/:name", authenticatedMiddleware, municipalityController.searchByName)

export { municipalityRouter }