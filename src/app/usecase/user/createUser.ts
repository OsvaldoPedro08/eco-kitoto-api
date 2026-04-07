import { CreateUserDTO } from "../../../http/interfaces/userDTO";
import { User } from "../../domain/entities/user";
import { IHashProvider } from "../../domain/repositories/hashProviderRepository";
import { UserRepository } from "../../domain/repositories/userRepository";

export class CreateUser {

    constructor(
        private hashProvider : IHashProvider,
        private userRepository : UserRepository
    ) {}

    async execute(data : CreateUserDTO) {

        //criptografar a senha antes de salvar
        const hashedPassword = await this.hashProvider.generateHash(data.password)

        const user = new User (
            data.iduser,
            data.name,
            data.email,
            hashedPassword,
            data.telephone,
            data.typeUser as any,
            data.districtId
        )

        await this.userRepository.create(user)

        return user
    }
}