"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.swaggerConfig = void 0;
exports.swaggerConfig = {
    info: {
        title: 'Lexart Backend API',
        version: '1.0.0',
        description: 'API Documentation for Lexart Backend',
    },
    security: {
        BearerAuth: {
            type: 'http',
            scheme: 'bearer',
            bearerFormat: 'JWT',
        },
    },
    baseDir: __dirname,
    filesPattern: ['../routes/*.js'],
    swaggerUIPath: '/api-docs',
    exposeSwaggerUI: true,
    exposeApiDocs: false,
    apiDocsPath: '/v3/api-docs',
    notRequiredAsNullable: false,
    swaggerUiOptions: {},
    multiple: true,
};
