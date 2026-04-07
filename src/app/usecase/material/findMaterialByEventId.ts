import { Material } from "../../domain/entities/material";
import { MaterialRepository } from "../../domain/repositories/material";

export class FindMaterialByEventId {
    constructor(private materialRepository : MaterialRepository) {}

    async execute(eventId : string) : Promise<Material[] | null> {

        return this.materialRepository.findMaterialByEventId(eventId)
    }
}