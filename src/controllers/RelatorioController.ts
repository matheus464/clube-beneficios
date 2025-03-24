import { Request, Response } from "express";
import { RelatorioService } from "../services/RelatorioService";

export class RelatorioController {
    private relatorioService = new RelatorioService();

    async vendas(req: Request, res: Response) {
        try {
           const relatorio = await this.relatorioService.gerarRelatorioDeVendas();
           res.json(relatorio); 
        } catch (error) {
            res.status(500).json({ erro: "Erro ao gerar relatório" });
        }
    }
}