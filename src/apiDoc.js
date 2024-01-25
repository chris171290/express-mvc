import swaggerUI from 'swagger-ui-express'
import { readFile } from 'fs/promises'

const swaggerJson = JSON.parse(await readFile(new URL('./swagger.json', import.meta.url)))

const swaggerUIOptions = {
  explorer: true,
  swaggerOptions: {
    // deepLinking: true,
    // defaultModelExpandDepth: 3,
    defaultModelsExpandDepth: -1, // no show models
    operationsSorter: 'alpha'
  }
}

export const swaggerDocs = (app) => {
  app.use('/api-docs/v1', swaggerUI.serve, swaggerUI.setup(swaggerJson, swaggerUIOptions))
}
