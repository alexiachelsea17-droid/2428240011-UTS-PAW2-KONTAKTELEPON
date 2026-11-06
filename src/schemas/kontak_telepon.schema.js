
import z, { email } from "zod";

export const inputKontakTeleponSchema = z.object({
    nama_kontak: z.string().trim().min(2, "Nama Kontak Minimal 2 Karakter"),
    nomor_telepon: z.number().min(10, "Nomor telepon minimal 10 angka"),
    email: z.string().trim().min(0, "Alamat email"),
});

export const updateKontakTeleponSchema = z.object({
    nama_kontak: z.string().trim().min(2, "Nama Kontak Minimal 2 Karakter"),
    nomor_telepon: z.number().min(10, "Nomor telepon minimal 10 angka"),
    email: z.string().trim().min(0, "Alamat email"),
});