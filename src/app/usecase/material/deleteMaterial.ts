import { MaterialRepository } from "../../domain/repositories/material";

export class DeleteMaterial {
    constructor(private materialRepository : MaterialRepository) {}

    async execute(idmaterial : string) : Promise<void> {

        return await this.materialRepository.delete(idmaterial)
    }
}