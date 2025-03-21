import { Request, Response } from "express";
import { ClienteService } from "../services/ClienteService";

export class ClienteController {
    private clienteService: ClienteService;

    constructor(){
        this.clienteService = new ClienteService();
    }

    async cadastrar(req: Request, res: Response) {
        try {
            const cliente = await this.clienteService.criarCliente(req.body);
            res.status(201).json(cliente);
        } catch (error: any){
            res.status(400).json({ erro: error.message });
        }
    }

    async listar(req: Request, res: Response){
        try {
            const clientes = await this.clienteService.listarCliente();
            res.status(200).json(clientes);
        } catch (error) {
            res.status(500).json({ erro: "Erro ao buscar clientes"} );
        }
    }
}