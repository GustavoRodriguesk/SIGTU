import express from 'express'
import listLinha from '../controllers/linha/listLinha.js'
import createlinha from '../controllers/linha/createlinha.js'
import editlinha from '../controllers/linha/editLinha.js'
import deletelinha from '../controllers/linha/deletelinha.js'

const router = express.Router()

router.get('/', listLinha)
router.post('/', createlinha)
router.put('/', editlinha)
router.delete('/', deletelinha)

export default router