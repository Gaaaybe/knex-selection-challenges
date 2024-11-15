import { Router } from "express";
import PagamentoController from "../controllers/pagamentoController";
import { validatePagamento } from "../middleware/validatePagamento";

const pagamentoRoutes = Router();

pagamentoRoutes.post(
  "/doacoes/:id/pagamento",
  validatePagamento,
  PagamentoController.gerarQRCodePIX,
);
pagamentoRoutes.put(
  "/pagamentos/:id/confirmar",
  PagamentoController.confirmarPagamento,
);
pagamentoRoutes.get(
  "/pagamentos/:id",
  PagamentoController.consultarStatusPagamento,
);
pagamentoRoutes.put(
  "/pagamentos/:id/gerar-nova-chave",
  PagamentoController.gerarNovaChavePIX,
);

export default pagamentoRoutes;
