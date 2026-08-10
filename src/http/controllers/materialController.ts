import { Request, Response } from "express";
import { DrizzleMaterialRepository } from "../../infra/repositories/drizzleMaterialRepository";
import { ListAll } from "../../app/usecase/material/listAll";
import { CreateMaterial } from "../../app/usecase/material/createMaterial";
import { UpdateMaterial } from "../../app/usecase/material/updateMaterial";
import { DeleteMaterial } from "../../app/usecase/material/deleteMaterial";
import { FindMaterialByEventId } from "../../app/usecase/material/findMaterialByEventId";

export class MaterialController {
    constructor() {}

//list all
    async listAll(request : Request, response : Response) {

        const drizzleMaterialRepository = new DrizzleMaterialRepository()
        const listAll = new ListAll(drizzleMaterialRepository)

        try {
                const listMaterial = await listAll.execute()

                return response.json(listMaterial)

        } catch (error) {
            return response.json({ error : "Erro ao listar os materiais de limpeza!"})
        }
    }

//create
    async create(request : Request, response : Response) {

        const { eventId, name } = request.body

        if(!eventId || !name) {
            return response.json({ message : "Campos inválidos!"})
        }

        const drizzleMaterialRepository = new DrizzleMaterialRepository()
        const createMaterial = new CreateMaterial(drizzleMaterialRepository)

        try {
                const material = await createMaterial.execute({
                    eventId : eventId,
                    name : name
                })

                return response.json(material)

        } catch (error) {
            return response.json({ error : "Erro ao cadastrar material de limpeza!"})
        }
    }
    
//update
    async update(request : Request, response : Response) {

        const idmaterial = String(request.params.id)
        const { name } = request.body
        
        if(!idmaterial) {
            return response.json({ message : "Material não encontrado!"})
        }

        if(!name) {
            return response.json({ message : "Campo inválido!"})
        }

        const drizzleMaterialRepository = new DrizzleMaterialRepository()
        const updateMaterial = new UpdateMaterial(drizzleMaterialRepository)

        try {
                const material = await updateMaterial.execute(idmaterial, name)

                return response.json(material)

        } catch (error) {
            return response.json({ error : "Erro ao atualizar material!"})
        }
    }

    async delete(request : Request, response : Response) {

        const idmaterial = String(request.params.id)

        if(!idmaterial) {
            return response.json({ message : "Material não encontrado!"})
        }

        const drizzleMaterialRepository = new DrizzleMaterialRepository()
        const deleteMaterial = new DeleteMaterial(drizzleMaterialRepository)

        try {
                await deleteMaterial.execute(idmaterial)

                return response.json({ message : "Material eliminado com sucesso!"})

        } catch (error) {
            return response.json({ error : "Erro ao eliminar material!"})
        }
    }

//find by event id
    async findMaterialByEventId(request : Request, response : Response) {

        const eventId = String(request.params.eventId)

        if(!eventId) {
            return response.json({ message : "Evento não encontrado!"})
        }

        const drizzleMaterialRepository = new DrizzleMaterialRepository()
        const findMaterial = new FindMaterialByEventId(drizzleMaterialRepository)

        try {
                const material = await findMaterial.execute(eventId)

                return response.json(material)
                
        } catch (error) {
            return response.json({ error : "Erro ao listar os materiais do Evento de Limpeza!"})
        }
    }

}