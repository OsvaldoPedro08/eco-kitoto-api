import express from "express"
import { systemRouter } from "../http/routes"
import { setupSwagger } from "../infra/config/swagger"

export const app = express()

//middleware
    app.use(express.json())

// systema de rotas
    app.use(systemRouter)

//ativa o swagger
    setupSwagger(app)