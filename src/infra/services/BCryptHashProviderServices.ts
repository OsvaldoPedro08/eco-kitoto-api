import { HashProviderRepository } from "../../app/domain/repositories/hashProviderRepository";
import { compare, hash } from "bcryptjs";

export class BCryptHashProviderServices implements HashProviderRepository {
    
    constructor() {}

//generate hash
    async generateHash(payload: string): Promise<string> {
        
        return hash(payload, 8) //o 8 é o custo do processamento
    }

//compare hash
    async compareHash(payload: string, hashed: string): Promise<boolean> {
       
        return compare(payload, hashed)
    }
}