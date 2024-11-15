import { Request, Response, NextFunction } from "express";
import { z } from "zod";

const doadorSchema = z.object({
  nome: z.string().min(3, "Nome deve ter no mínimo 3 caracteres"),
  email: z.string().email("Email inválido"),
  telefone: z
    .string()
    .regex(/^\(\d{2}\) \d{4,5}-\d{4}$/, "Telefone inválido")
    .optional(),
});

export const validateDoador = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    doadorSchema.parse(req.body);
    next();
  } catch (error) {
    return res.status(400).json({ error: (error as Error).message });
  }
};
