import KontakTeleponModels from "../modelS/kontak_telepon.models.js"
import KontakTelepon from "../modelS/kontak_telepon.models.js
import { inputKontakTeleponSchema, updateKontakTeleponSchema } from "../schemas/kontak_telepon.schema.js"
import { apiResponse, apiResponseValidation } from "../utils/response.js"

class KontakTeleponController {


    static async index(req, res) {
        try {
            const listKontak = await KontakTeleponModels.find()

            return apiResponse({
                res,
                status: 200,
                message: 'List Kontak Telepon',
                data: listKontak
            })
        } catch (error) {
            return apiResponse({
                res,
                status: 500,
                message: error.message
            })
        }
    }


    static async show(req, res) {
        try {
            const { id } = req.params
            const nama = await KontakTeleponModels.findById(id)

            if (!nama) {
                return apiResponse({
                    res,
                    status: 404,
                    message: "Nama tidak ditemukan"
                })
            }

            return apiResponse({
                res,
                status: 200,
                message: 'Detail Kontak',
                data: nama
            })
        } catch (error) {
            return apiResponse({
                res,
                status: 500,
                message: error.message
            })
        }
    }


    static async store(req, res) {
        const result = storeTiketKonserSchema.safeParse(req.body)
        if (!result.success) {
            return apiResponseValidation({
                res,
                errors: result.error
            })
        }

        try {
            const { nama_kontak, nomor_telepon, email } = result.data

            const newKontak = await KontakTeleponModels.create({
                nama_kontak,
                nomor_telepon,
                email
            })

            return apiResponse({
                res,
                status: 201,
                message: "Nama kontak berhasil ditambahkan",
                data: newKontak
            })
        } catch (error) {
            return apiResponse({
                res,
                status: 500,
                message: error.message
            })
        }
    }


    static async update(req, res) {
        const result = updateKontakTeleponSchema.safeParse(req.body)

        if (!result.success) {
            return apiResponseValidation({
                res,
                errors: result.error
            })
        }

        try {
            const { id } = req.params

            const updateKontak = await KontakTeleponModels.findByIdAndUpdate(
                id,
                result.data,
                { new: true, runValidators: true }
            )

            if (!updatedKontak) {
                return apiResponse({
                    res,
                    status: 404,
                    message: "Kontak tidak ditemukan"
                })
            }

            return apiResponse({
                res,
                status: 200,
                message: "Kontak berhasil di update",
                data: updatedKontak
            })
        } catch (error) {
            return apiResponse({
                res,
                status: 500,
                message: error.message
            })
        }
    }

    static async destroy(req, res) {
        try {
            const { id } = req.params

            const deletedKontak = await KontakTeleponModels.findByIdAndDelete(id)

            if (!deletedKontak) {
                return apiResponse({
                    res,
                    status: 404,
                    message: "Kontak tidak ditemukan"
                })
            }

            return apiResponse({
                res,
                status: 200,
                message: "Kontak berhasil dihapus"
            })
        } catch (error) {
            return apiResponse({
                res,
                status: 500,
                message: error.message
            })
        }
    }
}

export default KontakTeleponController