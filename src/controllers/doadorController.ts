import DoadorRepository from "../repositories/doadorRepository";
import { Request, Response } from "express";

class DoadorController {
  static async createDoador(req: Request, res: Response) {
    try {
      const doador = await DoadorRepository.createDoador(req.body);
      res.status(201).json(doador);
    } catch (error) {
      res.status(400).json({ error: (error as Error).message });
    }
  }

  static async getDoadorById(req: Request, res: Response) {
    try {
      const doador = await DoadorRepository.getDoadorById(
        Number(req.params.id),
      );
      res.status(200).json(doador);
    } catch (error) {
      res.status(404).json({ error: (error as Error).message });
    }
  }

  static async updateDoador(req: Request, res: Response) {
    try {
      const doador = await DoadorRepository.updateDoador(
        Number(req.params.id),
        req.body,
      );
      res.status(200).json(doador);
    } catch (error) {
      res.status(400).json({ error: (error as Error).message });
    }
  }
}

export default DoadorController;
