import { PrismaClient } from "@prisma/client";
import { z } from "zod";

const prisma = new PrismaClient();

export const userSchema = z.object({
  id: z
    .number({
      required_error: "O ID é obrigatório",
      invalid_type_error: "O ID deve ser um número.",
    })
    .positive("O ID deve ser positivo.")
    .optional(),

  public_id: z
    .string()
    .max(300, "O public_id deve ter no máximo 300 caracteres.")
    .optional(), // <-- agora é opcional

  email: z
    .string({
      required_error: "O email é obrigatório",
    })
    .email()
    .max(300, "O email deve ter no máximo 300 caracteres."),

  nascimento: z
    .string({
      required_error: "A data de nascimento é obrigatória.",
    })
    .min(10, "Data deve estar no formato DD/MM/AAAA.")
    .max(10, "Data deve estar no formato DD/MM/AAAA."),

  nome: z
    .string()
    .min(3, "O nome deve ter no mínimo 3 caracteres.")
    .max(100, "O nome deve ter no máximo 100 caracteres."),
  nomeMae: z
    .string()
    .min(3, "O nome da mãe deve ter no mínimo 3 caracteres.")
    .max(100, "O nome da mãe deve ter no máximo 100 caracteres.")
    .optional(),

  nomePai: z
    .string()
    .min(3, "O nome do pai deve ter no mínimo 3 caracteres.")
    .max(100, "O nome do pai deve ter no máximo 100 caracteres.")
    .optional(),

  cep: z.string().length(8, "O CEP deve ter exatamente 8 caracteres."),

  cepPonto: z
    .string()
    .length(8, "O CEP do ponto deve ter exatamente 8 caracteres."),

  cpf: z.string().length(11, "O CPF deve ter exatamente 11 caracteres."),

  telefone: z
    .string()
    .min(10, "O telefone deve ter no mínimo 10 caracteres.")
    .max(11, "O telefone deve ter no máximo 11 caracteres.")
    .optional(),

  faltas: z
    .number({
      invalid_type_error: "As faltas devem ser um número.",
    })
    .min(0, "As faltas não podem ser negativas."),

  sitFamiliar: z
    .string()
    .min(1, "A situação familiar é obrigatória.")
    .max(50, "Máximo de 50 caracteres."),

  residencia: z
    .string()
    .min(1, "A residência é obrigatória.")
    .max(50, "Máximo de 50 caracteres."),

  universidade: z
    .string()
    .min(1, "A universidade é obrigatória.")
    .max(40, "Máximo de 40 caracteres."),

  semestre: z.string().min(1).max(2),

  anoConclusao: z
    .string()
    .length(4, "O ano de conclusão deve ter 4 caracteres."),

  dias: z.string().min(1).max(10),

  periodo: z.string().min(1).max(10),

  horDetalhado: z.string().min(1).max(100),

  bolsa: z.boolean({
    required_error: "O campo bolsa é obrigatório.",
  }),

  bolsaTipo: z.string().min(1).max(20),

  bolsaPercent: z.string().min(1).max(4),

  foto3x4: z.string().max(300),

  cpfImg: z.string().max(300),

  compResidencia: z.string().max(300),

  historicoEscolar: z.string().max(300),

  decMatricula: z.string().max(300),

  cronogramaAulas: z.string().max(300),

  declaracaoEscrita: z.string().max(300),

  pass: z.string().min(6, "A senha deve ter no mínimo 6 caracteres.").max(256),
});

export const validateUser = (user) => {
  return userSchema.safeParse(user);
};

export const validateUserToCreate = (user) => {
  const partialUserSchema = userSchema.partial({
    id: true,
  });
  return partialUserSchema.safeParse(user);
};

export const validateUserToLogin = (user) => {
  const partialUserSchema = userSchema.partial({
    id: true,
    nome: true,
  });
  return partialUserSchema.safeParse(user);
};

// export const validateUserToLogin = (user) => {
//     const loginSchema = z.object({
//       email: z.string().email(),
//       pass: z.string().min(6).max(256),
//     });
//     return loginSchema.safeParse(user);
//   };

export const validateUserToUpdate = (user) => {
  const updateSchema = userSchema.partial().extend({
    id: z.number({
      required_error: "O ID é obrigatório para atualizar.",
    }),
  });

  return updateSchema.safeParse(user);
};

export const getAll = async () => {
  const users = await prisma.user.findMany({
    select: {
      id: true,
      nome: true,
      email: true,
      cpf: true,
    },
  });
  return users;
};

export const getById = async (id) => {
  const user = await prisma.user.findUnique({
    where: {
      id,
    },
    select: {
      pass: false,
      id: true,
      public_id: true,
      nascimento: true,
      nome: true,
      email: true,
      nomeMae: true,
      nomePai: true,
      cep: true,
      cpf: true,
      telefone: true,
      faltas: true,
      sitFamiliar: true,
      residencia: true,
      universidade: true,
      semestre: true,
      anoConclusao: true,
      dias: true,
      periodo: true,
      horDetalhado: true,
      bolsa: true,
      bolsaTipo: true,
      bolsaPercent: true,
      foto3x4: true,
      cpfImg: true,
      compResidencia: true,
      historicoEscolar: true,
      decMatricula: true,
      cronogramaAulas: true,
      declaracaoEscrita: true,
      cepPonto: true,
    },
  });
  return user;
};

export const getByEmail = async (email) => {
  const user = await prisma.user.findUnique({
    where: {
      email,
    },
    select: {
      pass: false,
      id: true,
      public_id: true,
      nascimento: true,
      nome: true,
      email: true,
      nomeMae: true,
      nomePai: true,
      cep: true,
      cpf: true,
      telefone: true,
      faltas: true,
      sitFamiliar: true,
      residencia: true,
      universidade: true,
      semestre: true,
      anoConclusao: true,
      dias: true,
      periodo: true,
      horDetalhado: true,
      bolsa: true,
      bolsaTipo: true,
      bolsaPercent: true,
      foto3x4: true,
      cpfImg: true,
      compResidencia: true,
      historicoEscolar: true,
      decMatricula: true,
      cronogramaAulas: true,
      declaracaoEscrita: true,
      cepPonto: true,
    },
  });
  return user;
};

export const getByCpf = async (cpf) => {
  const user = await prisma.user.findUnique({
    where: {
      cpf,
    },
    select: {
      pass: false,
      id: true,
      public_id: true,
      nascimento: true,
      nome: true,
      email: true,
      nomeMae: true,
      nomePai: true,
      cep: true,
      cpf: true,
      telefone: true,
      faltas: true,
      sitFamiliar: true,
      residencia: true,
      universidade: true,
      semestre: true,
      anoConclusao: true,
      dias: true,
      periodo: true,
      horDetalhado: true,
      bolsa: true,
      bolsaTipo: true,
      bolsaPercent: true,
      foto3x4: true,
      cpfImg: true,
      compResidencia: true,
      historicoEscolar: true,
      decMatricula: true,
      cronogramaAulas: true,
      declaracaoEscrita: true,
      cepPonto: true,
    },
  });
  return user;
};

export const create = async (user) => {
  const result = await prisma.user.create({
    data: user,
    select: {
      id: true,
      public_id: true,
      email: true,
      nome: true,
      cpf: true,
    },
  });
};

export const remove = async (id) => {
  const user = await prisma.user.delete({
    where: {
      id,
    },
  });
  delete user.pass;
  return user;
};

export const update = async (user) => {
  const { id, ...data } = user;

  const result = await prisma.user.update({
    where: { id },
    data,
    select: {
      id: true,
      nome: true,
      cpf: true,
      public_id: true,
    },
  });

  return result;
};
