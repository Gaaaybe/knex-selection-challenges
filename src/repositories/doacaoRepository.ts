import { prisma } from "../services/prisma";
import { Doacao } from "@prisma/client";

class DoacaoRepository {
  static async getDoacoes() {
    return prisma.doacao.findMany();
  }

  static async createMultipleDoacoes(
    doacoesData: Omit<
      Doacao,
      "id" | "data_criacao" | "data_confirmacao" | "pagamento"
    >[],
  ) {
    return prisma.$transaction(
      doacoesData.map((doacaoData) =>
        prisma.doacao.create({ data: doacaoData }),
      ),
    );
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

  static async deleteDoacao(id: number) {
    return prisma.doacao.delete({ where: { id } });
  }

  static async filterDoacoes(filters: {
    periodoInicio?: Date;
    periodoFim?: Date;
    valorMin?: number;
    valorMax?: number;
    status?: string;
  }) {
    return prisma.doacao.findMany({
      where: {
        AND: [
          filters.periodoInicio
            ? { data_criacao: { gte: filters.periodoInicio } }
            : {},
          filters.periodoFim
            ? { data_criacao: { lte: filters.periodoFim } }
            : {},
          filters.valorMin ? { valor: { gte: filters.valorMin } } : {},
          filters.valorMax ? { valor: { lte: filters.valorMax } } : {},
          filters.status ? { status: filters.status } : {},
        ],
      },
    });
  }
}

export default DoacaoRepository;
