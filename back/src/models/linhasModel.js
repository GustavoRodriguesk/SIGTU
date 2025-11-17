import { PrismaClient } from '@prisma/client'
import { z } from 'zod'

const prisma = new PrismaClient()

// VALIDAÇÃO

const linhaSchema = z.object({
    id: z.number({
            required_error: "O ID é obrigatório",
            invalid_type_error: "O ID deve ser um número inteiro.",
        })
        .positive({message: "O ID deve ser um número positivo."})
        .optional(), 

    rota: z.string({
            required_error: "A rota é obrigatória",
            invalid_type_error: "A rota deve ser uma string.",
        })
        .max(1000, { message: "A rota deve ter no máximo 1000 caracteres." }),
    
    nome: z.string({
            required_error: "O nome da linha é obrigatório",
            invalid_type_error: "O nome deve ser uma string.",
        })
        .min(1, { message: "O nome não pode ser vazio." })
        .max(20, { message: "O nome deve ter no máximo 20 caracteres." }), 
    
    adminId: z.number({
        required_error: "O ID do admin é obrigatório",
        invalid_type_error: "O adminId deve ser um número.",
    })
    .int()
    .positive()
})

// FUNÇÕES DE VALIDAÇÃO

export const validateLinha = (linha) => {
    return linhaSchema.safeParse(linha)
}

export const validateLinhaToCreate = (linha) => {
    const createSchema = linhaSchema.omit({ id: true })
    return createSchema.safeParse(linha)
}

export const validateLinhaToUpdate = (linha) => {
    const updateSchema = linhaSchema.partial().required({ id: true })
    return updateSchema.safeParse(linha)
}

export const validateLinhaToPatch = (linha) => {
    const patchSchema = linhaSchema.omit({ id: true }).partial();
    return patchSchema.safeParse(linha);
}

// CRUD

export const getAllLinhas = async () => {
    const linhas = await prisma.linha.findMany({
        include: {
            admin: {
                select: {
                    id: true,
                    nome: true,
                    email: true
                }
            },
            onibus: true 
        }
    })
    return linhas
}

export const getLinhaById = async (id) => {
    const linha = await prisma.linha.findUnique({
        where: { id },
        include: {
            admin: {
                select: {
                    id: true,
                    nome: true,
                    email: true
                }
            },
            onibus: true
        }
    })
    return linha
}

export const createLinha = async (linhaData) => {
    const result = await prisma.linha.create({
        data: linhaData,
    })
    return result
}

export const removeLinha = async (id) => {
    const linha = await prisma.linha.delete({
        where: { id }
    })
    return linha
}

export const updateLinha = async (id, dataToUpdate) => {
    const result = await prisma.linha.update({
        where: { id },
        data: dataToUpdate,
    })
    return result
}