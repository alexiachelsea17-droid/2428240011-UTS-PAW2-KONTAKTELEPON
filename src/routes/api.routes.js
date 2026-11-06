import express from 'express'
import FakultasController from '../controllers/kontak_telepon.controller.js'

const router = express.Router()

// Endpoint akan ditambahkan di sini

export default router

router.get('/fakultas', FakultasController.index)