module.exports = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'Coach marketplace API',
      version: '1.0.0',
      description: 'Coach marketplace API is where stand the logic',
      // TODO: Add real license and contact info
      // license: {
      //   name: 'MIT',
      //   url: 'https://choosealicense.com/licenses/mit/',
      // },
      // contact: {
      //   name: 'Swagger',
      //   url: 'https://swagger.io',
      //   email: 'info@email.com',
      // },
    },
    servers: [
      {
        url: 'http://localhost:5555/v1/',
        description: 'Local server',
      },
    ],
  },
  apis: ['./src/models/user/index.js', './src/routes/users/index.js'],
}
