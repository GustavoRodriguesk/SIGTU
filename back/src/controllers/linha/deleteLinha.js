import { removeLinha } from './linhasModel.js';

export const deleteLinhaController = async (req, res) => {
    const id = Number(req.params.id);

    if (isNaN(id)) {
        return res.status(400).json({ erro: "ID inválido. O ID deve ser um número." });
    }

    try {
        const linhaDeletada = await removeLinha(id);
        
        return res.status(200).json({
            mensagem: "Linha removida com sucesso.",
            linha: linhaDeletada
        });

    } catch (error) {

        if (error.code === 'P2025') {
            return res.status(404).json({ erro: "Linha não encontrada. Não foi possível deletar." });
        }

        console.error("Erro ao deletar linha:", error);
        return res.status(500).json({ erro: "Erro interno no servidor." });
    }
};