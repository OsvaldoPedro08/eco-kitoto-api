import { Router } from "express";
import { AuthController } from "../controllers/authController";

const authRouter = Router()
const authController = new AuthController()

// DOC SWWAGGER
/** 
 * @openapi
 * /eco-kitoto/login:
 *  post:
 *      summary: Autenticar utilizador
 *      description: Realiza a autenticação de um utilizador registado com e-mail e palavra-passe, retornando um token JWT de acesso.
 *      tags:
 *          - AUTHENTICATION
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      required:
 *                          - email
 *                          - password
 *                      properties:
 *                          email:
 *                              type: string
 *                              format: email
 *                              example: "usuario@ecokitoto.com"
 *                              description: E-mail cadastrado do utilizador
 *                          password:
 *                              type: string
 *                              format: password
 *                              example: "123456789"
 *                              description: Palavra-passe do utilizador
 *      responses:
 *          200:
 *              description: Login realizado com sucesso.
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              token:
 *                                  type: string
 *                                  example: "eyJhbGci0iJIUzI1NiIs..."
 *                              user:
 *                                  type: object
 *                                  properties:
 *                                      id:
 *                                          type: string
 *                                          example: "4534erthr"
 *                                      name:
 *                                          type: string
 *                                          example: "João Neto"
 *                                      email:
 *                                          type: string
 *                                          example: "usuario@ecokitoto.com"
 *          400:
 *              description: Requisição Inválida (campo em falta ou formato incorreto).
 *          401:
 *              description: Credenciais Inválidas (e-mail ou palavra-passe incorretos).
*/

// ======== LOGIN ========
    authRouter.post("/login", authController.handle)

export { authRouter }