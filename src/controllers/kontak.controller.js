import Kontak from '../models/kontak.model.js'
import { AppError } from '../errors/app-error.js'
import {
  createKontakSchema,
  updateKontakSchema,
} from '../schemas/kontak.schema.js'

const searchableFields = ['name', 'phone', 'email']
const sortableFields = ['name', 'phone', 'email', 'createdAt', 'updatedAt']

const escapeRegex = (value) => value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')

class KontakController {
  static async index(req, res, next) {
    try {
      const { search, name, phone, email } = req.query
      const sortBy = typeof req.query.sortBy === 'string' ? req.query.sortBy : 'createdAt'
      const order = typeof req.query.order === 'string' ? req.query.order.toLowerCase() : 'desc'

      if (!sortableFields.includes(sortBy)) {
        throw new AppError(
          `Field pengurutan tidak diizinkan. Gunakan: ${sortableFields.join(', ')}`,
          400,
        )
      }

      if (!['asc', 'desc'].includes(order)) {
        throw new AppError('Parameter order harus bernilai asc atau desc', 400)
      }

      const conditions = []

      if (typeof search === 'string' && search.trim()) {
        const keyword = new RegExp(escapeRegex(search.trim()), 'i')
        conditions.push({
          $or: searchableFields.map((field) => ({ [field]: keyword })),
        })
      }

      for (const field of searchableFields) {
        const value = req.query[field]
        if (typeof value === 'string' && value.trim()) {
          conditions.push({
            [field]: { $regex: escapeRegex(value.trim()), $options: 'i' },
          })
        }
      }

      const filter = conditions.length > 0 ? { $and: conditions } : {}
      const sortDirection = order === 'asc' ? 1 : -1

      const contacts = await Kontak.find(filter).sort({ [sortBy]: sortDirection })

      return res.status(200).json({
        meta: {
          status: 200,
          message: 'Daftar kontak berhasil ditampilkan',
        },
        data: contacts,
      })
    } catch (error) {
      return next(error)
    }
  }

  static async store(req, res, next) {
    try {
      const result = createKontakSchema.safeParse(req.body)

      if (!result.success) {
        return next(result.error)
      }

      const newKontak = await Kontak.create(result.data)

      return res.status(201).json({
        meta: {
          status: 201,
          message: 'Kontak berhasil ditambahkan',
        },
        data: newKontak,
      })
    } catch (error) {
      return next(error)
    }
  }

  static async show(req, res, next) {
    try {
      const kontak = await Kontak.findById(req.params.id)

      if (!kontak) {
        throw new AppError('Kontak tidak ditemukan', 404)
      }

      return res.status(200).json({
        meta: {
          status: 200,
          message: 'Detail kontak berhasil ditampilkan',
        },
        data: kontak,
      })
    } catch (error) {
      return next(error)
    }
  }

  static async update(req, res, next) {
    try {
      const result = updateKontakSchema.safeParse(req.body)

      if (!result.success) {
        return next(result.error)
      }

      const updatedKontak = await Kontak.findByIdAndUpdate(
        req.params.id,
        result.data,
        {
          new: true,
          runValidators: true,
        },
      )

      if (!updatedKontak) {
        throw new AppError('Kontak tidak ditemukan', 404)
      }

      return res.status(200).json({
        meta: {
          status: 200,
          message: 'Kontak berhasil diperbarui',
        },
        data: updatedKontak,
      })
    } catch (error) {
      return next(error)
    }
  }

  static async destroy(req, res, next) {
    try {
      const deletedKontak = await Kontak.findByIdAndDelete(req.params.id)

      if (!deletedKontak) {
        throw new AppError('Kontak tidak ditemukan', 404)
      }

      return res.status(200).json({
        meta: {
          status: 200,
          message: 'Kontak berhasil dihapus',
        },
        data: deletedKontak,
      })
    } catch (error) {
      return next(error)
    }
  }
}

export default KontakController
