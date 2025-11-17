const busById = async (req, res) => {
    const { id } = req.params;
    const bus = await getById(+id);

    if (bus) {
        return res.json({
            message: "bus get by id",
            bus
        });
    } else {
        return res.status(404).json({
            error: "Usuário não encontrado"
        });
    }
};

export default busById;