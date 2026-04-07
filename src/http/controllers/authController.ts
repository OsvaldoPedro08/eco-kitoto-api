import { Request, Response } from "express";
import { DrizzleUserRepository } from "../../infra/repositories/drizzleUserRepository";
import { BCryptHashProviderServices } from "../../infra/services/BCryptHashProviderServices";
import { JWTProviderServices } from "../../infra/services/JWTProviderServices";
import { Authenticate } from "../../app/usecase/user/auth";

export class AuthController {

    constructor() {}

    async handle(request : Request, response : Response) : Promise<Response> {

        const { email, password } = request.body

        if(!email || !password) {
            return response.json({ message : "Dados inválidos!"})
        }

        const drizzleUserRepository = new DrizzleUserRepository()
        const hashProvider = new BCryptHashProviderServices()
        const jwtProvider = new JWTProviderServices()

        const authenticate = new Authenticate(
            drizzleUserRepository,
            hashProvider,
            jwtProvider
        )

        try {
                const result = await authenticate.execute({ email, password})
 
                return response.json(result)

        } catch (error) {
            return response.json({ error : "Erro ao autenticar usuário!"})
        }
    }
}