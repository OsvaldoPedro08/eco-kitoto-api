import { NextFunction, Request, Response } from "express";

export function checkRoleMiddleware(permitionRoles : string[]) {

    return (request : Request, response : Response, next : NextFunction) => {

        if(!permitionRoles.includes(request.user.typeUser)) {
            return response.json({ error : "Acesso negado. Você não tem permissão para acessar essa rota!"});
        }

        return next();
    }
}