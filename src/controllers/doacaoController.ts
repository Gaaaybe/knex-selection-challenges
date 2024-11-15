import DoacaoRepository from "../repositories/doacaoRepository";
import { Request, Response } from "express";

class DoacaoController {
  static async createDoacao(req: Request, res: Response) {
    try {
      const doacao = await DoacaoRepository.createDoacao(req.body);
      res.status(201).json(doacao);
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
}

export default DoacaoController;
