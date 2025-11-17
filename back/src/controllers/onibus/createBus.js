import { create, validateBusToCreate } from "../../models/busModel.js"

const createBus = async (req, res, next) => {
   try{
        const bus = req.body
        const busValidated = validateBusToCreate(bus)

        if (!busValidated.success) {
            return res.status(400).json({
                error: "Dados inválidos",
                details: busValidated.error.errors
            })
        }
        
        const result = await create(busValidated.data)
        return res.json({
            success: "Onibus criado com sucesso!",
            bus: result
        })

    } catch(error) {
        console.log(error)
    }
}

export default createBus