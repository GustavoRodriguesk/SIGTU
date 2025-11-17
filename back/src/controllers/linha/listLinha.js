import { getAllLinhas, getLinhaById } from './linhasModel.js';

export const getAllLinhasController = async (req, res) => {
    try {
        const linhas = await getAllLinhas();
        return res.status(200).json(linhas);
    } catch (error) {
        console.error("Erro ao buscar linhas:", error);
        return res.status(500).json({ erro: "Erro interno no servidor." });
    }
};

export const getLinhaByIdController = async (req, res) => {
    const id = Number(req.params.id);

    if (isNaN(id)) {
        return res.status(400).json({ erro: "ID inválido." });
    }

    try {
        const linha = await getLinhaById(id);

        if (!linha) {
            return res.status(404).json({ erro: "Linha não encontrada." });
        }

        return res.status(200).json(linha);

    } catch (error) {
        console.error("Erro ao buscar linha:", error);
        return res.status(500).json({ erro: "Erro interno no servidor." });
    }
};