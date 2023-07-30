const swaggerAutogen = require('swagger-autogen');

const doc = {
    info: {
      title: 'My API',
      description: 'Description',
    },
    host: 'localhost:3000',
    schemes: ['http'],
  };

const outputFile = './swagger-output.json';
const endPointsFile = ['./app.js'];

swaggerAutogen(outputFile, endPointsFile, doc);