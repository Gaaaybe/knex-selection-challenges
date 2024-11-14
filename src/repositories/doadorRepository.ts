import { prisma } from "../services/prisma";
import { Doador } from "@prisma/client";

class DoadorRepository {
  static async createDoador(
    data: Omit<Doador, "id" | "data_cadastro" | "doacoes">,
  ) {
    return prisma.doador.create({ data });
  }

  static async getDoadorById(id: number) {
    return prisma.doador.findUnique({
      where: { id },
      include: { doacoes: true },
    });
  }

  static async updateDoador(
    id: number,
    data: Partial<Omit<Doador, "id" | "data_cadastro" | "doacoes">>,
  ) {
    return prisma.doador.update({ where: { id }, data });
  }
}

export default DoadorRepository;
