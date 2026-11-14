import express from 'express'
import KontakController from '../controllers/kontak.controller.js'

const router = express.Router()

router.get('/', KontakController.index)
router.post('/', KontakController.store)
router.get('/:id', KontakController.show)
router.put('/:id', KontakController.update)
router.delete('/:id', KontakController.destroy)

export default router
