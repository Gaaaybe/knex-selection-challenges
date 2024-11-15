import { prisma } from "../services/prisma";
import { Doacao } from "@prisma/client";

class DoacaoRepository {
  static async createDoacao(data: Omit<Doacao, "id" | "data_cadastro">) {
    return prisma.doacao.create({ data });
  }

  static async getDoacaoById(id: number) {
    return prisma.doacao.findUnique({
      where: { id },
    });
  }

  static async updateDoacao(
    id: number,
    data: Partial<Omit<Doacao, "id" | "data_cadastro">>,
  ) {
    return prisma.doacao.update({ where: { id }, data });
  }
}

export default DoacaoRepository;
