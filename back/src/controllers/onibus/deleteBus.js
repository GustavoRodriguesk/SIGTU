import { remove } from "../../models/busModel.js"

const deleteBus = async (req, res, next) => {
    try {
        const {id}  = req.params
        const bus =  await remove(+id)

        return res.json({
            message: "Onibus removido com sucesso!", 
            bus
        })
    } catch (error) {
        console.log(error)
    }
}
export default deleteBus