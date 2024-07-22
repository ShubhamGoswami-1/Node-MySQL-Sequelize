import swaggerJsdoc from 'swagger-jsdoc';

const options = {
  swaggerDefinition: {
    openapi: '3.0.0', // Specify the OpenAPI version
    info: {
      title: 'Shubham API Docs', // Title of the documentation
      version: '1.0.0', // Version of the API
      description: 'API documentation generated with Swagger',
    },
    servers: [
      {
        url: 'http://localhost:3000', // The base URL of the API
        description: 'Development server',
      },
    ],
  },
  apis: ['./routes/*.js'], // Path to the API routes folder
};

const specs = swaggerJsdoc(options);

export default specs;
