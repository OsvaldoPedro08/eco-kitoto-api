import { Router } from "express";
import { EmailController } from "../controllers/emailController";

const emailRouter = Router()
const emailController = new EmailController()

/**
 * @openapi
 * /eco-kitoto/enviar-email:
 *   post:
 *     summary: Enviar um e-mail através do serviço de e-mail
 *     tags:
 *       - SEND_EMAIL
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - fromEmail
 *               - toEmail
 *               - subject
 *               - text
 *             properties:
 *               fromEmail:
 *                 type: string
 *                 format: email
 *                 example: "remetente@ecokitoto.co.ao"
 *               toEmail:
 *                 type: string
 *                 format: email
 *                 example: "destino@ecokitoto.co.ao"
 *               subject:
 *                 type: string
 *                 example: "Notificação do Sistema"
 *               text:
 *                 type: string
 *                 example: "Conteúdo descritivo da mensagem de e-mail."
 *     responses:
 *       201:
 *         description: E-mail enviado com sucesso.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 fromEmail:
 *                   type: string
 *                   example: "remetente@ecokitoto.co.ao"
 *                 toEmail:
 *                   type: string
 *                   example: "destino@ecokitoto.co.ao"
 *                 subject:
 *                   type: string
 *                   example: "Notificação do Sistema"
 *                 text:
 *                   type: string
 *                   example: "Conteúdo descritivo da mensagem de e-mail."
 *       200:
 *         description: Validação de campos obrigatórios não preenchidos.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Todos os campos devem ser preenchidos!"
 */

// view all emails
    //emailRouter.get("/todos-emails")
//send email
    emailRouter.post("/enviar-email", emailController.send)

export { emailRouter }