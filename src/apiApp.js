import express from 'express'
import { createMovieRouter } from './routes/movies.js'
import { corsMiddleware, errorLogger, errorResponder, invalidPathHandler } from './middlewares/index.js'
import logger from 'morgan'
import { swaggerDocs } from './apiDoc.js'
import { createHealthcheckerRouter } from './routes/healthchecker.js'

export const apiApp = ({ movieModel }) => {
  const app = express()
  const PORT = process.env.PORT || 3000

  app.use(logger('dev'))
  app.use(express.json())
  app.use(corsMiddleware())

  app.disable('x-powered-by')

  // Rutas
  app.get('/', (req, res) => res.redirect('/v1/api-docs/'))
  app.use('/v1/movies', createMovieRouter({ movieModel }))
  app.use('/v1/healthcheck', createHealthcheckerRouter())

  // Swagger ui
  swaggerDocs(app)

  // app.use(express.static('public'))
  app.use(errorLogger)
  app.use(errorResponder)
  app.use(invalidPathHandler)

  return {
    app, PORT
  }
}
