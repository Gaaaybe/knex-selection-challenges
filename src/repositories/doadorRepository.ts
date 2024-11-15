import { prisma } from "../services/prisma";
import { Doador } from "@prisma/client";

class DoadorRepository {
  static async getAllDoadores() {
    return prisma.doador.findMany();
  }

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

  static async getDoadorWithDoacoes(id: number) {
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

  static async deleteDoador(id: number) {
    return prisma.doador.delete({ where: { id } });
  }
}

export default DoadorRepository;
