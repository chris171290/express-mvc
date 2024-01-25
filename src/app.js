import express from 'express'
import { createMovieRouter } from './routes/movies.js'
import { corsMiddleware, errorLogger, errorResponder, invalidPathHandler } from './middlewares/index.js'
import logger from 'morgan'
import { swaggerDocs } from './apiDoc.js'

export const createApp = ({ movieModel }) => {
  const app = express()
  const PORT = process.env.PORT || 3000

  app.use(logger('dev'))
  app.use(express.json())
  app.use(corsMiddleware())

  app.disable('x-powered-by')

  // Rutas
  app.get('/', (req, res) => res.redirect('/api-docs/v1/'))
  app.use('/v1/movies', createMovieRouter({ movieModel }))
  swaggerDocs(app)

  // app.use(express.static('public'))
  app.use(errorLogger)
  app.use(errorResponder)
  app.use(invalidPathHandler)

  app.listen(PORT, () => {
    console.log(`server listening on port http://localhost:${PORT}`)
    console.log(`Docs are avalaible at http://localhost:${PORT}/api-docs/v1`)
  })
}
