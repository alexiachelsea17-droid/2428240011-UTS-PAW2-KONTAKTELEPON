# UTS PAW2 - Kontak Telepon

**NPM:** 2428240011  
**Studi kasus:** Kontak Telepon  
**Field:** `name`, `phone`, `email`

## 1. Persiapan
 
Pastikan Node.js dan MongoDB Atlas sudah tersedia.

```bash
npm install
```

Salin `.env.example` menjadi `.env`, kemudian isi `DATABASE_URL` dengan connection string MongoDB Atlas milik sendiri.

Contoh format:

```env
APP_PORT=3000
DATABASE_URL=mongodb+srv://USERNAME:PASSWORD@cluster0.xxxxx.mongodb.net/kontak_telepon?retryWrites=true&w=majority
```

Jangan mengunggah file `.env` ke GitHub.

## 2. Menjalankan aplikasi

```bash
npm run dev
```

Server berjalan pada `http://localhost:3000`.

## 3. Endpoint RESTful API

| Method | Endpoint | Fungsi |
|---|---|---|
| GET | `/api/kontak` | Menampilkan semua kontak |
| POST | `/api/kontak` | Menambahkan kontak |
| GET | `/api/kontak/:id` | Menampilkan detail kontak |
| PUT | `/api/kontak/:id` | Memperbarui kontak |
| DELETE | `/api/kontak/:id` | Menghapus kontak |

### Contoh body POST

```json
{
  "name": "Alexia Chelsea",
  "phone": "081234567890",
  "email": "alexia@example.com"
}
```

### Search

Cari pada seluruh field:

`GET /api/kontak?search=alexia`

Cari berdasarkan field tertentu:

- `/api/kontak?name=alexia`
- `/api/kontak?phone=0812`
- `/api/kontak?email=gmail.com`

### Order / sorting

Urutkan berdasarkan nama ascending:

`GET /api/kontak?sortBy=name&order=asc`

Urutkan berdasarkan nama descending:

`GET /api/kontak?sortBy=name&order=desc`

Field sorting yang diizinkan: `name`, `phone`, `email`, `createdAt`, `updatedAt`.

Search dan sorting dapat digunakan bersamaan, misalnya:

`GET /api/kontak?search=alexia&sortBy=name&order=asc`

## 4. HTTP status code

- `200`: permintaan berhasil.
- `201`: data berhasil dibuat.
- `400`: parameter atau ID tidak valid.
- `404`: data atau endpoint tidak ditemukan.
- `409`: data duplikat.
- `422`: validasi data gagal.
- `500`: kesalahan server.

## 5. Catatan

Database Atlas dan connection string harus dibuat/diisi menggunakan akun masing-masing. File `.env` tidak disertakan agar kredensial database tetap aman.
