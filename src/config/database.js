import mongoose from 'mongoose'
import { DATABASE_URL } from './env.js'

export const connectDB = async () => {
  if (!DATABASE_URL) {
    throw new Error('DATABASE_URL belum diatur pada file .env')
  }

  await mongoose.connect(DATABASE_URL)
  console.log('MongoDB Atlas connected successfully')
}
