import mongoose from 'mongoose'

const kontakSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Nama wajib diisi'],
      trim: true,
      minlength: [2, 'Nama minimal 2 karakter'],
      maxlength: [100, 'Nama maksimal 100 karakter'],
    },
    phone: {
      type: String,
      required: [true, 'Nomor telepon wajib diisi'],
      trim: true,
      minlength: [8, 'Nomor telepon minimal 8 karakter'],
      maxlength: [20, 'Nomor telepon maksimal 20 karakter'],
      match: [/^\+?[0-9][0-9\s().-]*$/, 'Format nomor telepon tidak valid'],
    },
    email: {
      type: String,
      required: [true, 'Email wajib diisi'],
      trim: true,
      lowercase: true,
      match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, 'Format email tidak valid'],
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
)

const Kontak = mongoose.model('Kontak', kontakSchema)

export default Kontak
