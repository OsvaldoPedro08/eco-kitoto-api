import { Material } from "../../domain/entities/material";
import { MaterialRepository } from "../../domain/repositories/material";

export class UpdateMaterial {
    constructor(private materialRepository : MaterialRepository) {}

    async execute(idmaterial : string, name : string) : Promise<Material> {

        return await this.materialRepository.update(idmaterial, name)
    }
}