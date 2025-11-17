import { validateLinhaToCreate, createLinha } from './linhasModel.js';

export const createLinhaController = async (req, res) => {
    const dados = req.body;

    const validacao = validateLinhaToCreate(dados);

    if (!validacao.success) {
        return res.status(400).json({
            erro: "Dados inválidos",
            detalhes: validacao.error.format() 
        });
    }

    try {
        
        const novaLinha = await createLinha(validacao.data);

        
        return res.status(201).json({
            mensagem: "Linha criada com sucesso!",
            linha: novaLinha
        });

    } catch (error) {
        console.error("Erro ao criar linha:", error);

        
        if (error.code === 'P2003') {
            return res.status(400).json({ erro: "O adminId informado não existe." });
        }

        return res.status(500).json({ erro: "Erro interno no servidor." });
    }
};