import { Doacao } from "@prisma/client";
import DoacaoRepository from "../repositories/doacaoRepository";
import { Request, Response } from "express";

class DoacaoController {
  static async getDoacoes(req: Request, res: Response) {
    try {
      const doacoes = await DoacaoRepository.getDoacoes();
      res.status(200).json(doacoes);
    } catch (error) {
      res.status(404).json({ error: (error as Error).message });
    }
  }

  static async createDoacao(req: Request, res: Response) {
    try {
      const doacoesData = req.body.map((doacao: Doacao) => ({
        ...doacao,
      }));

      const doacoes = await DoacaoRepository.createMultipleDoacoes(doacoesData);

      res.status(201).json(doacoes);
    } catch (error) {
      res.status(400).json({ error: (error as Error).message });
    }
  }

  static async getDoacaoById(req: Request, res: Response) {
    try {
      const doacao = await DoacaoRepository.getDoacaoById(
        Number(req.params.id),
      );
      res.status(200).json(doacao);
    } catch (error) {
      res.status(404).json({ error: (error as Error).message });
    }
  }

  static async filterDoacoes(req: Request, res: Response) {
    try {
      const { periodoInicio, periodoFim, valorMin, valorMax, status } =
        req.query;
      const doacoes = await DoacaoRepository.filterDoacoes({
        periodoInicio: periodoInicio
          ? new Date(periodoInicio as string)
          : undefined,
        periodoFim: periodoFim ? new Date(periodoFim as string) : undefined,
        valorMin: valorMin ? Number(valorMin) : undefined,
        valorMax: valorMax ? Number(valorMax) : undefined,
        status: status as string,
      });
      res.json(doacoes);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      res.status(500).json({ error: "Erro ao filtrar doações" });
    }
  }

  static async getDoacaoStatus(req: Request, res: Response) {
    try {
      const doacao = await DoacaoRepository.getDoacaoById(
        Number(req.params.id),
      );
      if (doacao) {
        res.status(200).json({ status: doacao.status });
      } else {
        res.status(404).json({ error: "Doacao não encontrada" });
      }
    } catch (error) {
      res.status(404).json({ error: (error as Error).message });
    }
  }

  static async updateDoacao(req: Request, res: Response) {
    try {
      const doacao = await DoacaoRepository.updateDoacao(
        Number(req.params.id),
        req.body,
      );
      res.status(200).json(doacao);
    } catch (error) {
      res.status(400).json({ error: (error as Error).message });
    }
  }
  static async deleteDoacao(req: Request, res: Response) {
    try {
      await DoacaoRepository.deleteDoacao(Number(req.params.id));
      res.status(204).end();
    } catch (error) {
      res.status(404).json({ error: (error as Error).message });
    }
  }
}

export default DoacaoController;
