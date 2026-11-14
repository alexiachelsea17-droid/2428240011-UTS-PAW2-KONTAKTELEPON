import app from './app.js'
import { APP_PORT } from './config/env.js'
import { connectDB } from './config/database.js'

try {
  await connectDB()

  app.listen(APP_PORT, () => {
    console.log(`Server berjalan pada http://localhost:${APP_PORT}`)
  })
} catch (error) {
  console.error('Gagal menjalankan aplikasi:', error.message)
  process.exit(1)
}


 