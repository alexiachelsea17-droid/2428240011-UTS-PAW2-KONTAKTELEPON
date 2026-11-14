import { z } from 'zod'

export const createKontakSchema = z
  .object({
    name: z.string().trim().min(2, 'Nama minimal 2 karakter').max(100, 'Nama maksimal 100 karakter'),
    phone: z
      .string()
      .trim()
      .min(8, 'Nomor telepon minimal 8 karakter')
      .max(20, 'Nomor telepon maksimal 20 karakter')
      .regex(/^\+?[0-9][0-9\s().-]*$/, 'Format nomor telepon tidak valid'),
    email: z.string().trim().email('Format email tidak valid'),
  })
  .strict()

export const updateKontakSchema = createKontakSchema
  .partial()
  .refine((data) => Object.keys(data).length > 0, {
    message: 'Minimal satu field harus diisi untuk memperbarui kontak',
  })
