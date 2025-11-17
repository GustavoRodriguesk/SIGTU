import { update } from "../../models/busModel.js"

const editBus = async (req, res) => {
    const {id} = req.params
    const bus = req.body
    
    bus.id = +id

    const result = await update(bus)

    if(!result)
        return res.status(401).json({
            error: "Erro ao criar usuário"
        })

    return res.json({
        success: "Usuário atualizado com sucesso!",
        bus: result
    })
}

export default editBus