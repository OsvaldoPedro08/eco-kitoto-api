import { User } from "../../domain/entities/user";
import { UserRepository } from "../../domain/repositories/userRepository";

export class FindByEmail {

    constructor(private userRepository : UserRepository) {}

    async execute(email : string) : Promise<User[] | null> {

        return await this.userRepository.findByEmail(email)
    }
}