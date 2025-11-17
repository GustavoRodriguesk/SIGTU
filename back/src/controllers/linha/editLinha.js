import { validateLinhaToPatch, updateLinha } from '../linhasModel.js'; 

export const updateLinhaController = async (req, res) => {
    
    const id = Number(req.params.id);

    if (isNaN(id)) {
        return res.status(400).json({ erro: "ID inválido." });
    }

    const validacao = validateLinhaToPatch(req.body);

    if (!validacao.success) {
        return res.status(400).json({
            erro: "Dados inválidos para atualização",
            detalhes: validacao.error.format()
        });
    }

    if (Object.keys(validacao.data).length === 0) {
        return res.status(400).json({ erro: "Nenhum dado enviado para atualização." });
    }

    try {
        const linhaAtualizada = await updateLinha(id, validacao.data);

        return res.status(200).json({
            mensagem: "Linha atualizada com sucesso!",
            linha: linhaAtualizada
        });

    } catch (error) {
        if (error.code === 'P2025') {
            return res.status(404).json({ erro: "Linha não encontrada." });
        }
        
        if (error.code === 'P2003') {
            return res.status(400).json({ erro: "O novo Admin ID informado não existe." });
        }

        console.error("Erro ao atualizar linha:", error);
        return res.status(500).json({ erro: "Erro interno no servidor." });
    }
};