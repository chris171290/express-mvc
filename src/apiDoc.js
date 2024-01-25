import swaggerUI from 'swagger-ui-express'
import { readFile } from 'fs/promises'

const CSS_URL = '/swagger-ui2.css'

const swaggerJson = JSON.parse(await readFile(new URL('./swagger.json', import.meta.url)))

const swaggerUIOptions = {
  explorer: true,
  customCss: '.swagger-ui .opblock .opblock-summary-path-description-wrapper { align-items: center; display: flex; flex-wrap: wrap; gap: 0 10px; padding: 0 10px; width: 100%; }',
  customCssUrl: CSS_URL,
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
