import { PrismaClient } from '@prisma/client'
import { z } from 'zod'

const prisma = new PrismaClient()

const busSchema = z.object({
  id: z.number().positive({ message: "O ID deve ser positivo" }),
  capacidade: z.number().min(3).max(100),
  nmrOnibus: z.string().min(3).max(100),
  linhaId: z.number().positive(),
  periodoId: z.number().positive(),
})

// validação completa
export const validateBus = (bus) => busSchema.safeParse(bus)

// validação para criação (id opcional)
export const validateBusToCreate = (bus) =>
  busSchema.partial({ id: true }).safeParse(bus)

export const getAll = async () =>
  prisma.onibus.findMany({
    select: {
      id: true,
      capacidade: true,
      nmrOnibus: true,
      linhaId: true,
      periodoId: true
    }
  })

export const getById = async (id) =>
  prisma.onibus.findUnique({
    where: { id },
    select: {
      id: true,
      capacidade: true,
      nmrOnibus: true,
      linhaId: true,
      periodoId: true
    }
  })

export const create = async (bus) =>
  prisma.onibus.create({
    data: bus,
    select: {
      id: true,
      capacidade: true,
      nmrOnibus: true,
      linhaId: true,
      periodoId: true
    }
  })

export const remove = async (id) =>
  prisma.onibus.delete({
    where: { id },
    select: {
      id: true,
      capacidade: true,
      nmrOnibus: true,
      linhaId: true,
      periodoId: true
    }
  })

export const update = async (bus) =>
  prisma.onibus.update({
    where: { id: bus.id },
    data: bus,
    select: {
      id: true,
      capacidade: true,
      nmrOnibus: true,
      linhaId: true,
      periodoId: true
    }
  })
