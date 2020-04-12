const swaggerUi = require('swagger-ui-express')
const swaggerJsdoc = require('swagger-jsdoc')

const mainDoc = require('./mainDocumentation')

module.exports = (app) => {
  app.use(
    '/doc',
    swaggerUi.serve,
    swaggerUi.setup(swaggerJsdoc(mainDoc), { explorer: true }),
  )
}
