import { Material } from "../entities/material";

export interface MaterialRepository {
    listAll() : Promise<Material[] | null>
    create(material : Material) : Promise<Material>
    update(idmaterial: string, name: string) : Promise<Material>
    delete(idmaterial : string) : Promise<void>
    findMaterialByEventId(eventId : string) : Promise<Material[] | null>
}