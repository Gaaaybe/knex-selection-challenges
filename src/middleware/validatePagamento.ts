import { Request, Response, NextFunction } from "express";
import { z } from "zod";

const pagamentoSchema = z.object({
  chave_pix: z.string().uuid("Chave PIX inválida"),
  qr_code: z.string().url("QR Code inválido"),
  status: z.enum(["pendente", "confirmado", "cancelado"]),
  data_expiracao: z.date(),
});

export const validatePagamento = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    pagamentoSchema.parse(req.body);
    next();
  } catch (error) {
    return res.status(400).json({ error: (error as Error).message });
  }
};
