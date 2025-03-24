import { Request, Response } from "express";
import { AuthRequest } from "../middlewares/authMiddleware";
import { CompraService } from "../services/CompraService";

export class PagamentoController {
    private compraService = new CompraService();

    async pagar(req: AuthRequest, res: Response) {
        try {
           const clienteId = req.user.id;
           const { compraId } =  req.body;
           
           const compra = await this.compraService.pagarCompra(compraId, clienteId);
           res.status(200).json( { mensagem: "Pagamento realizado com sucesso", compra });
        } catch (error: any) {
            res.status(400).json( { erro: error.message });
        }
    }
}