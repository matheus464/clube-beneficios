import { Request, Response } from "express";
import { CompraService } from "../services/CompraService";
import { AuthRequest } from "../middlewares/authMiddleware";
import { CompraDTO } from "../dtos/CompraDTO";

export class CompraController {
    private compraService = new CompraService();

    async registrar(req: AuthRequest, res: Response) {
        try {
          const clienteId = req.user.id;
          const dados: CompraDTO = req.body;  

          const compra = await this.compraService.registrarCompra(clienteId, dados);
          return res.status(201).json(compra);
        } catch (error: any){
            return res.status(400).json({ erro: error.message });
        }
    }

    async listar(req: AuthRequest, res: Response) {
        try {
          const clienteId = req.user.id;
          const compras = await this.compraService.listarPorCliente(clienteId);
          return res.json(compras);
        }catch(error: any){
            return res.status(500).json({ erro: "Erro ao buscar compras" });
        }
    }

}