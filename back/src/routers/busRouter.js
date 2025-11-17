import express from 'express'
import busList from '../controllers/onibus/busList.js'
import busById from '../controllers/onibus/busById.js'
import createBus from '../controllers/onibus/createBus.js'
import editBus from '../controllers/onibus/editBus.js'
import deleteBus from '../controllers/onibus/deleteBus.js'

const router = express.Router()

router.post('/', createBus)
router.get('/list', busList)
router.put('/:id', editBus)
router.delete('/:id', deleteBus)
router.get('/:id', busById)

export default router