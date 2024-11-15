import { Request, Response, NextFunction } from "express";
import { z } from "zod";

const doacaoSchema = z.object({
  valor: z
    .number()
    .min(5, "Valor mínimo é R$ 5,00")
    .max(10000, "Valor máximo é R$ 10.000,00"),
  mensagem: z
    .string()
    .max(200, "Mensagem deve ter no máximo 200 caracteres")
    .optional(),
  status: z.enum(["pendente", "confirmada", "cancelada"]).optional(),
  doadorId: z.number({
    required_error: "Doador ID é obrigatório.",
    invalid_type_error: "Doador ID deve ser um número.",
  }),
});

export const validateDoacao = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    doacaoSchema.parse(req.body);
    next();
  } catch (error) {
    return res.status(400).json({ error: (error as Error).message });
  }
};
