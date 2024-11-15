import { prisma } from "../services/prisma";
import { Pagamento } from "@prisma/client";

class PagamentoRepository {
  static async createPagamento(
    data: Omit<Pagamento, "id" | "data_criacao" | "data_confirmacao">,
  ) {
    return prisma.pagamento.create({ data });
  }

  static async getPagamentoById(id: number) {
    return prisma.pagamento.findUnique({ where: { id } });
  }

  static async updatePagamento(
    id: number,
    data: Partial<Omit<Pagamento, "id" | "data_criacao">>,
  ) {
    return prisma.pagamento.update({ where: { id }, data });
  }

  static async deletePagamento(id: number) {
    return prisma.pagamento.delete({ where: { id } });
  }
}

export default PagamentoRepository;
