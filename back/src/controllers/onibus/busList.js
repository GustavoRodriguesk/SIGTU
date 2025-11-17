import { getAll } from '../../models/busModel.js'

const busList = async (req, res) => {

    const bus = await getAll()
    res.json(bus)
}

export default busList