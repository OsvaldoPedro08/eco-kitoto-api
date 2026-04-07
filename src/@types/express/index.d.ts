enum typeUserEnum {
    administrador = "Administrador",
    administradora = "Administradora",
    voluntario = "Voluntário",
    voluntaria = "Voluntária",
    cidadao = "Cidadão"
}

declare namespace Express {
    export interface Request {
        user : {
            id : string;
            typeUser : typeUserEnum
        };
    }
}