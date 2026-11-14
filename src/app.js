import express from 'express'
import apiRoutes from './routes/api.routes.js'
import { requestTimeLogger } from './middleware/request-time.middleware.js'
import { errorHandler, notFoundHandler } from './middleware/error.middleware.js'

const app = express()

app.use(requestTimeLogger)
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.get('/', (req, res) => {
  res.status(200).json({
    message: 'RESTful API Kontak Telepon aktif',
    endpoints: '/api/kontak',
  })
})

app.use('/api/kontak', apiRoutes)

app.use(notFoundHandler)
app.use(errorHandler)

export default app
 
 
