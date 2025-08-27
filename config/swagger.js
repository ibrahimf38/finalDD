// swagger.js
const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

const options = {
    definition: {
        openapi: "3.0.0", // Version OpenAPI
        info: {
            title: "Mon API Node.js",
            version: "1.0.0",
            description: "Documentation API avec Swagger",
        },
        servers: [
            {
                url: "http://localhost:8000", // ton URL de dev
            },
        ],
    },
    apis: ["./src/routes/*.js"] // fichiers où sont définis tes endpoints
};

const swaggerSpec = swaggerJsDoc(options);

function swaggerDocs(app, port) {
    app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
    console.log(`📄 Swagger docs disponible sur http://localhost:${port}/api-docs`);
}

module.exports = swaggerDocs;
