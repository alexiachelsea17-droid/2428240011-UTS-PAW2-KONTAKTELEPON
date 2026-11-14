import { ZodError, z } from 'zod'
import { AppError } from '../errors/app-error.js'

export const notFoundHandler = (req, res, next) => {
  next(new AppError(`Endpoint tidak ditemukan: ${req.method} ${req.originalUrl}`, 404))
}

export const errorHandler = (err, req, res, next) => {
  let statusCode = err.statusCode || 500
  let message = err.message || 'Terjadi kesalahan pada server'
  let errors = err.errors || null

  if (err instanceof ZodError) {
    statusCode = 422
    message = 'Validasi data gagal'
    errors = z.flattenError(err).fieldErrors
  } else if (err.name === 'CastError') {
    statusCode = 400
    message = 'Format ID kontak tidak valid'
    errors = null
  } else if (err.name === 'ValidationError') {
    statusCode = 422
    message = 'Validasi database gagal'
    errors = Object.fromEntries(
      Object.entries(err.errors || {}).map(([field, detail]) => [field, [detail.message]]),
    )
  } else if (err.code === 11000) {
    statusCode = 409
    message = 'Data dengan nilai tersebut sudah tersedia'
  }

  if (statusCode >= 500) {
    console.error(err)
    message = 'Terjadi kesalahan pada server'
  }

  return res.status(statusCode).json({
    meta: {
      status: statusCode,
      message,
    },
    ...(errors ? { errors } : {}),
  })
}
