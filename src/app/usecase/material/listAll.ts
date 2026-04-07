import { Material } from "../../domain/entities/material";
import { MaterialRepository } from "../../domain/repositories/material";

export class ListAll {
    constructor(private materialRepository : MaterialRepository) {}

    async execute() : Promise<Material[] | null> {

        return await this.materialRepository.listAll()
    }
}