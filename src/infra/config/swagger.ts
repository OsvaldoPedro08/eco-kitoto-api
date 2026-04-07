import 'dotenv/config'
import { Express } from 'express';
import swaggerJSDoc from 'swagger-jsdoc'
import swaggerUi from 'swagger-ui-express'

//definicao das configuracoes basicas
const options : swaggerJSDoc.Options = {
    definition : {
        openapi : '3.0.4',
        info : {
            title : "API eco-kitoto",
            version : '1.0.0',
            description : 'Documentação da API de recolha de resíduos',
            contact : {
                name : 'Yhanko'
            },
        },
        servers : [
            {
                url : 'http://localhost:'+process.env.API_PORT,
                description : 'Servidor de desenvolvimento',
            },
        ],
        components : {
            securitySchemes : {
                bearerAuth : {
                    type : 'http',
                    scheme : 'bearer',
                    bearerFormat : 'JWT',
                },
            },
        },
    },
    //lê os comentarios em todos os arquivos .ts dentro de src
    apis : ['./src/http/routes/*.ts', './src/http/controllers/*.ts'],
};

const swaggerSpec = swaggerJSDoc(options);

export const setupSwagger = (app : Express) : void => {
    //rota onde a documentacao sera exibida
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

    //rota opcional para baixar o json da documentacao
    app.get('/api-docs.json', (request, response) => {
        response.setHeader('Content-Type', 'application/json')
        response.send(swaggerSpec)
    });

    console.log('Swagger configurado em http://localhost:'+process.env.API_PORT+'/api-docs')
}