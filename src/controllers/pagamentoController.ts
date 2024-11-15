/* eslint-disable @typescript-eslint/no-unused-vars */
import { Request, Response } from "express";
import PagamentoRepository from "../repositories/pagamentoRepository";
import DoacaoRepository from "../repositories/doacaoRepository";
import { v4 as uuidv4 } from "uuid";

class PagamentoController {
  static async gerarQRCodePIX(req: Request, res: Response) {
    try {
      const doacaoId = Number(req.params.id);
      const doacao = await DoacaoRepository.getDoacaoById(doacaoId);
      if (!doacao) {
        return res.status(404).json({ error: "Doação não encontrada" });
      }

      const chave_pix = uuidv4();
      const qr_code = `https://pix.example.com/qrcode/${chave_pix}`;
      const data_expiracao = new Date(Date.now() + 15 * 60 * 1000); // 15 minutos

      const pagamentoData = {
        chave_pix,
        qr_code,
        status: "pendente",
        data_expiracao,
        doacaoId,
      };

      const pagamento =
        await PagamentoRepository.createPagamento(pagamentoData);
      res.status(201).json(pagamento);
    } catch (error) {
      res.status(500).json({ error: "Erro ao gerar QR Code PIX" });
    }
  }

  static async confirmarPagamento(req: Request, res: Response) {
    try {
      const pagamentoId = Number(req.params.id);
      const pagamento = await PagamentoRepository.getPagamentoById(pagamentoId);
      if (!pagamento) {
        return res.status(404).json({ error: "Pagamento não encontrado" });
      }
      if (pagamento.status !== "pendente") {
        return res
          .status(400)
          .json({ error: "Pagamento já confirmado ou cancelado" });
      }
      if (new Date() > pagamento.data_expiracao) {
        return res.status(400).json({ error: "Pagamento expirado" });
      }

      const pagamentoAtualizado = await PagamentoRepository.updatePagamento(
        pagamentoId,
        {
          status: "confirmado",
          data_confirmacao: new Date(),
        },
      );

      // Notificar o doador (mock)
      console.log(
        `Notificação enviada para o doador: ${pagamentoAtualizado.chave_pix}`,
      );

      res.json(pagamentoAtualizado);
    } catch (error) {
      res.status(500).json({ error: "Erro ao confirmar pagamento" });
    }
  }

  static async consultarStatusPagamento(req: Request, res: Response) {
    try {
      const pagamentoId = Number(req.params.id);
      const pagamento = await PagamentoRepository.getPagamentoById(pagamentoId);
      if (!pagamento) {
        return res.status(404).json({ error: "Pagamento não encontrado" });
      }
      res.json(pagamento);
    } catch (error) {
      res.status(500).json({ error: "Erro ao consultar status do pagamento" });
    }
  }

  static async gerarNovaChavePIX(req: Request, res: Response) {
    try {
      const pagamentoId = Number(req.params.id);
      const pagamento = await PagamentoRepository.getPagamentoById(pagamentoId);
      if (!pagamento) {
        return res.status(404).json({ error: "Pagamento não encontrado" });
      }
      if (
        pagamento.status !== "pendente" ||
        new Date() <= pagamento.data_expiracao
      ) {
        return res
          .status(400)
          .json({ error: "Pagamento ainda válido ou já confirmado" });
      }

      const novaChave_pix = uuidv4();
      const novoQr_code = `https://pix.example.com/qrcode/${novaChave_pix}`;
      const novaData_expiracao = new Date(Date.now() + 15 * 60 * 1000); // 15 minutos

      const pagamentoAtualizado = await PagamentoRepository.updatePagamento(
        pagamentoId,
        {
          chave_pix: novaChave_pix,
          qr_code: novoQr_code,
          data_expiracao: novaData_expiracao,
        },
      );

      res.json(pagamentoAtualizado);
    } catch (error) {
      res.status(500).json({ error: "Erro ao gerar nova chave PIX" });
    }
  }
}

export default PagamentoController;
