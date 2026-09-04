import { Router } from "express";
import { MaterialController } from "../controllers/materialController";

const materialRoutes = Router()
const materialController = new MaterialController()

/**
 * @openapi
 * /eco-kitoto/materiais:
 *   get:
 *     summary: Listar todos os materiais de limpeza
 *     tags:
 *       - MATERIAL
 *     responses:
 *       200:
 *         description: Lista de materiais de limpeza retornada com sucesso.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                     example: "9b1deb4d-3b7d-41b9-9189-e82200c01234"
 *                   eventId:
 *                     type: string
 *                     example: "9b1deb4d-3b7d-41b9-9189-e82200c01422"
 *                   name:
 *                     type: string
 *                     example: "Sacos de Lixo 100L"
 *       500:
 *         description: Erro ao listar os materiais de limpeza.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Erro ao listar os materiais de limpeza!"
 *
 * /eco-kitoto/materiais/novo:
 *   post:
 *     summary: Cadastrar um novo material de limpeza
 *     tags:
 *       - MATERIAL
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - eventId
 *               - name
 *             properties:
 *               eventId:
 *                 type: string
 *                 example: "9b1deb4d-3b7d-41b9-9189-e82200c01422"
 *               name:
 *                 type: string
 *                 example: "Luvas de Proteção"
 *     responses:
 *       200:
 *         description: Material de limpeza cadastrado com sucesso ou erro de validação.
 *         content:
 *           application/json:
 *             schema:
 *               oneOf:
 *                 - type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                       example: "9b1deb4d-3b7d-41b9-9189-e82200c01234"
 *                     eventId:
 *                       type: string
 *                       example: "9b1deb4d-3b7d-41b9-9189-e82200c01422"
 *                     name:
 *                       type: string
 *                       example: "Luvas de Proteção"
 *                 - type: object
 *                   properties:
 *                     message:
 *                       type: string
 *                       example: "Campos inválidos!"
 *       500:
 *         description: Erro ao cadastrar o material de limpeza.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Erro ao cadastrar material de limpeza!"
 *
 * /eco-kitoto/materiais/editar/{id}:
 *   patch:
 *     summary: Atualizar dados de um material de limpeza
 *     tags:
 *       - MATERIAL
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID do material a ser atualizado
 *         schema:
 *           type: string
 *         example: "9b1deb4d-3b7d-41b9-9189-e82200c01234"
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
 *                 example: "Vassouras de Ráfia"
 *     responses:
 *       200:
 *         description: Material atualizado com sucesso ou mensagem de erro de validação.
 *         content:
 *           application/json:
 *             schema:
 *               oneOf:
 *                 - type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                       example: "9b1deb4d-3b7d-41b9-9189-e82200c01234"
 *                     eventId:
 *                       type: string
 *                       example: "9b1deb4d-3b7d-41b9-9189-e82200c01422"
 *                     name:
 *                       type: string
 *                       example: "Vassouras de Ráfia"
 *                 - type: object
 *                   properties:
 *                     message:
 *                       type: string
 *                       example: "Material não encontrado!"
 *                 - type: object
 *                   properties:
 *                     message:
 *                       type: string
 *                       example: "Campo inválido!"
 *       500:
 *         description: Erro ao atualizar o material de limpeza.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Erro ao atualizar material!"
 *
 * /eco-kitoto/materiais/eliminar/{id}:
 *   delete:
 *     summary: Eliminar um material de limpeza
 *     tags:
 *       - MATERIAL
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID do material a eliminar
 *         schema:
 *           type: string
 *         example: "9b1deb4d-3b7d-41b9-9189-e82200c01234"
 *     responses:
 *       200:
 *         description: Resposta com o estado da eliminação do material.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Material eliminado com sucesso!"
 *       500:
 *         description: Erro ao eliminar o material de limpeza.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Erro ao eliminar material!"
 *
 * /eco-kitoto/materiais/evento/{eventId}:
 *   get:
 *     summary: Listar materiais de limpeza associados a um evento específico
 *     tags:
 *       - MATERIAL
 *     parameters:
 *       - name: eventId
 *         in: path
 *         required: true
 *         description: ID do evento de limpeza
 *         schema:
 *           type: string
 *         example: "9b1deb4d-3b7d-41b9-9189-e82200c01422"
 *     responses:
 *       200:
 *         description: Lista de materiais do evento retornada com sucesso ou validação do ID.
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
 *                         example: "9b1deb4d-3b7d-41b9-9189-e82200c01234"
 *                       eventId:
 *                         type: string
 *                         example: "9b1deb4d-3b7d-41b9-9189-e82200c01422"
 *                       name:
 *                         type: string
 *                         example: "Kits de Primeiros Socorros"
 *                 - type: object
 *                   properties:
 *                     message:
 *                       type: string
 *                       example: "Evento não encontrado!"
 *       500:
 *         description: Erro ao listar os materiais do evento.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Erro ao listar os materiais do Evento de Limpeza!"
 */

//list all
    materialRoutes.get("/materiais", materialController.listAll)
//create
    materialRoutes.post("/materiais/novo", materialController.create)
//update
    materialRoutes.patch("/materiais/editar/:id", materialController.update)
//delete
    materialRoutes.delete("/materiais/eliminar/:id", materialController.delete)
//find by event id
    materialRoutes.get("/materiais/evento/:eventId", materialController.findMaterialByEventId)
export { materialRoutes }