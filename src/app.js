import path from 'node:path'
import express from 'express'
import { createMovieRouter } from './routes/movies.js'
import { corsMiddleware, errorLogger, errorResponder, invalidPathHandler } from './middlewares/index.js'
import logger from 'morgan'
import { swaggerDocs } from './apiDoc.js'

export const createApp = ({ movieModel }) => {
  const app = express()
  const ROOT_FOLDER = path.join(process.cwd(), '..')
  const SRC_FOLDER = path.join(ROOT_FOLDER, 'src')
  const PORT = process.env.PORT || 3000

  app.use(logger('dev'))
  app.use(express.json())
  app.use(corsMiddleware())

  app.disable('x-powered-by')

  // Rutas
  console.log(path.join(SRC_FOLDER, 'public'))
  app.use('/public', express.static(path.join(SRC_FOLDER, 'public')))
  app.get('/', (req, res) => res.redirect('/api-docs/v1'))
  app.use('/v1/movies', createMovieRouter({ movieModel }))
  swaggerDocs(app)

  app.use(errorLogger)
  app.use(errorResponder)
  app.use(invalidPathHandler)

  app.listen(PORT, () => {
    console.log(`server listening on port http://localhost:${PORT}`)
    console.log(`Docs are avalaible at http://localhost:${PORT}/api-docs/v1`)
  })
}
