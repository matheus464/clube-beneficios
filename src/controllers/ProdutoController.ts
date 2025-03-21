import { Request, Response } from "express";
import { ProdutoService } from "../services/ProdutoService";

export class ProdutoController {
    private produtosService: ProdutoService;

    constructor() {
        this.produtosService = new ProdutoService();
    }

    async cadastrar( req: Request, res: Response) {
        try {
            const {nome, descricao, preco, categoria} = req.body;
            const produto = await this.produtosService.criarProduto( { nome, descricao, preco, categoria });
            res.status(201).json(produto);
        } catch (error: any) {
            res.status(400).json( { erro: error.message });
        }
    }

    async listar(req: Request, res: Response) {
        try {
            const produtos = await this.produtosService.listarProdutos();
            res.status(200).json(produtos);
        } catch (error){
            res.status(500).json( { erro: "Erro ao buscar produtos" });
        }
    }
}