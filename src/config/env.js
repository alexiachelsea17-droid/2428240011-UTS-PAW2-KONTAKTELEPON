import 'dotenv/config'

export const APP_PORT = Number(process.env.APP_PORT || 3000)
export const DATABASE_URL = process.env.DATABASE_URL
