import { Router } from "express";
import { CriticalAreaController } from "../controllers/criticalAreaController";
import { authenticatedMiddleware } from "../middlewares/authenticatedMiddleware";
import { checkRoleMiddleware } from "../middlewares/checkRoleMiddleware";
import { upload } from "../../utils/multer";

const criticalAreaRouter = Router()
const criticalAreaController = new CriticalAreaController()

/**
 * @openapi
 * /eco-kitoto/area-critica:
 *   get:
 *     summary: Listar todas as áreas críticas
 *     tags:
 *       - CRITICAL_AREA
 *     security:
 *       - cookieAuth: []
 *     responses:
 *       200:
 *         description: Lista de áreas críticas.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   idcriticalArea:
 *                     type: string
 *                     example: "9b1deb4d-3b7d-41b9-9189-e82200c01401"
 *                   districtId:
 *                     type: string
 *                     example: "dist-12345"
 *                   descrition:
 *                     type: string
 *                     example: "Acúmulo excessivo de resíduos sólidos no canal"
 *                   coordenaties:
 *                     type: string
 *                     example: "-8.838333, 13.234444"
 *                   critical_level:
 *                     type: string
 *                     example: "Baixo | Médio | Alto"
 *                   image_1:
 *                     type: string
 *                     example: "https://res.cloudinary.com/demo/image/upload/v1234/area-1.jpg"
 *                   image_2:
 *                     type: string
 *                     example: "https://res.cloudinary.com/demo/image/upload/v1234/area-2.jpg"
 *                   image_3:
 *                     type: string
 *                     example: "https://res.cloudinary.com/demo/image/upload/v1234/area-3.jpg"
 *                   estatus:
 *                     type: string
 *                     example: "Pendente | Em Limpeza | Resolvido"
 *       500:
 *         description: Erro ao listar áreas críticas.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Erro ao listar Áreas Críticas!"
 *
 * /eco-kitoto/area-critica/nova:
 *   post:
 *     summary: Criar uma nova área crítica
 *     tags:
 *       - CRITICAL_AREA
 *     security:
 *       - cookieAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - districtId
 *               - descrition
 *               - coordenaties
 *               - critical_level
 *             properties:
 *               districtId:
 *                 type: string
 *                 example: "8634707c-6ef2-4024-9f59-5155"
 *               descrition:
 *                 type: string
 *                 example: "Acúmulo excessivo de resíduos sólidos no canal"
 *               coordenaties:
 *                 type: string
 *                 example: "-8.838333, 13.234444"
 *               critical_level:
 *                 type: string
 *                 example: "Baixo | Médio | Alto"
 *               estatus:
 *                 type: string
 *                 example: "Pendente"
 *               image_1:
 *                 type: string
 *                 format: binary
 *                 description: Primeira imagem da área crítica (máximo 2MB)
 *               image_2:
 *                 type: string
 *                 format: binary
 *                 description: Segunda imagem da área crítica (opcional - máximo 2MB)
 *               image_3:
 *                 type: string
 *                 format: binary
 *                 description: Terceira imagem da área crítica (opcional - máximo 2MB)
 *     responses:
 *       200:
 *         description: Área crítica criada com sucesso.
 *       400:
 *         description: Dados inválidos fornecidos.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Dados inválidos! Por favor, preencha todos os dados disponíveis"
 *
 * /eco-kitoto/area-critica/editar/{id}:
 *   patch:
 *     summary: Atualizar dados de uma área crítica
 *     tags:
 *       - CRITICAL_AREA
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID da área crítica a atualizar
 *         schema:
 *           type: string
 *         example: "9b1deb4d-3b7d-41b9-9189-e82200c01401"
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               districtId:
 *                 type: string
 *                 example: "dist-12345"
 *               descrition:
 *                 type: string
 *                 example: "Acúmulo excessivo de resíduos sólidos no canal"
 *               coordenaties:
 *                 type: string
 *                 example: "-8.838333, 13.234444"
 *               critical_level:
 *                 type: string
 *                 example: "Baixo | Médio | Alto"
 *               estatus:
 *                 type: string
 *                 example: "Pendente | Em Limpeza | Resolvido"
 *               image:
 *                 type: string
 *                 format: binary
 *                 description: Imagem de atualização (máximo 2MB)
 *     responses:
 *       200:
 *         description: Área crítica atualizada com sucesso.
 *       400:
 *         description: Dados inválidos ou limite de tamanho de imagem excedido.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Dados inválidos! Por favor, preencha todos os dados disponíveis"
 *                 message_pt:
 *                   type: string
 *                   example: "Tamanho da imagem excedido"
 *
 * /eco-kitoto/area-critica/eliminar/{id}:
 *   delete:
 *     summary: Eliminar uma área crítica
 *     tags:
 *       - CRITICAL_AREA
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID da área crítica a eliminar
 *         schema:
 *           type: string
 *         example: "9b1deb4d-3b7d-41b9-9189-e82200c01401"
 *     responses:
 *       200:
 *         description: Área crítica eliminada com sucesso.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Área crítica eliminada com sucesso!"
 *       400:
 *         description: Área crítica não encontrada.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Área crítica não encontrada!"
 *       500:
 *         description: Erro ao eliminar área crítica.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Erro ao eliminar Área Crítica!"
 * 
 * /eco-kitoto/area-critica/{id}:
 *   get:
 *     summary: Pesquisar área crítica por ID
 *     tags:
 *       - CRITICAL_AREA
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID da área crítica
 *         schema:
 *           type: string
 *         example: "9b1deb4d-3b7d-41b9-9189-e82200c01401"
 *     responses:
 *       200:
 *         description: Área crítica encontrada com sucesso.
 *       400:
 *         description: Área crítica não encontrada.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Área crítica não encontrada!"
 *       500:
 *         description: Erro ao pesquisar área crítica por ID.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Erro ao pesquisar Área Crítica pelo ID!"
 *
 * /eco-kitoto/area-critica/nivel/{criticidade}:
 *   get:
 *     summary: Pesquisar áreas críticas pelo nível de criticidade
 *     tags:
 *       - CRITICAL_AREA
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - name: criticidade
 *         in: path
 *         required: true
 *         description: Nível de criticidade da área
 *         schema:
 *           type: string
 *         example: "Baixo | Médio | Alto"
 *     responses:
 *       200:
 *         description: Áreas críticas encontradas para o nível informado.
 *       400:
 *         description: Área crítica não encontrada.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Área crítica não encontrada!"
 *       500:
 *         description: Erro ao pesquisar áreas críticas por criticidade.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Erro ao pesquisar Área crítica pelo Nível de Criticidade!"
 *
 * /eco-kitoto/area-critica/status/{status}:
 *   get:
 *     summary: Pesquisar áreas críticas pelo status
 *     tags:
 *       - CRITICAL_AREA
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - name: status
 *         in: path
 *         required: true
 *         description: Status da área crítica
 *         schema:
 *           type: string
 *         example: "PENDENTE"
 *     responses:
 *       200:
 *         description: Áreas críticas encontradas com o status especificado.
 *       400:
 *         description: Área crítica não encontrada.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Área Crítica não encontrada!"
 *       500:
 *         description: Erro ao pesquisar áreas críticas por status.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Erro ao pesquisar Área Crítica pelo Status!"
 *
 * /eco-kitoto/area-critica/coordenadas/{coordenadas}:
 *   get:
 *     summary: Pesquisar áreas críticas pelas coordenadas
 *     tags:
 *       - CRITICAL_AREA
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - name: coordenaties
 *         in: path
 *         required: true
 *         description: Coordenadas geográficas da área crítica
 *         schema:
 *           type: string
 *         example: "-8.838333, 13.234444"
 *     responses:
 *       200:
 *         description: Áreas críticas encontradas nas coordenadas informadas.
 *       400:
 *         description: Área crítica não encontrada.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Área Crítica não encontrada!"
 *       500:
 *         description: Erro ao pesquisar áreas críticas por coordenadas.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Erro ao pesquisar Área Crítica pelas Coordenadas!"
 *
 * /eco-kitoto/area-critica/bairro/{localidade}:
 *   get:
 *     summary: Pesquisar áreas críticas pelo bairro ou localidade
 *     tags:
 *       - CRITICAL_AREA
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - name: locality
 *         in: path
 *         required: true
 *         description: Nome do bairro ou localidade da área crítica
 *         schema:
 *           type: string
 *         example: "Maianga"
 *     responses:
 *       200:
 *         description: Áreas críticas encontradas na localidade informada.
 *       400:
 *         description: Área crítica não encontrada.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Área Crítica não encontrada!"
 *       500:
 *         description: Erro ao pesquisar áreas críticas por localidade.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Erro ao pesquisar Área Crítica pela localidade!"
 */

//list all  
    criticalAreaRouter.get("/area-critica", authenticatedMiddleware, criticalAreaController.listAll)
//create
    criticalAreaRouter.post("/area-critica/nova", authenticatedMiddleware, upload.fields([
        { name : "image_1", maxCount : 1 },
        { name : "image_2", maxCount : 1 },
        { name : "image_3", maxCount : 1 }
    ]), criticalAreaController.create)
//update
    criticalAreaRouter.patch("/area-critica/editar/:id", authenticatedMiddleware, upload.single("image"), criticalAreaController.update)
//delete
    criticalAreaRouter.delete("/area-critica/eliminar/:id", authenticatedMiddleware, checkRoleMiddleware(['Administrador','Administradora']), criticalAreaController.delete)
//search by id
    criticalAreaRouter.get("/area-critica/:id", authenticatedMiddleware, criticalAreaController.searchAreaById)
//search by critical level
    criticalAreaRouter.get("/area-critica/nivel/:criticidade", authenticatedMiddleware, criticalAreaController.searchByCriticalLevel)
//search by status
    criticalAreaRouter.get("/area-critica/status/:status", authenticatedMiddleware, criticalAreaController.searchByStatus)
//search by coordenaties
    criticalAreaRouter.get("/area-critica/coordenadas/:coordenadas", authenticatedMiddleware, criticalAreaController.searchByCoordenaties)
//search by locality
    criticalAreaRouter.get("/area-critica/bairro/:localidade", authenticatedMiddleware, criticalAreaController.searchByLocality)

export { criticalAreaRouter }