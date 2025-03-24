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
          const query = {
            nome: req.query.nome as string,
            categoria: req.query.categoria as string,
            precoMin: req.query.precoMin ? Number(req.query.precoMin) : undefined,
            precoMax: req.query.precoMax ? Number(req.query.precoMax) : undefined,
            page: req.query.page ? Number(req.query.page) : 1,
            limit: req.query.limit ? Number(req.query.limit) : 10
          };
      
          const resultado = await this.produtosService.listarComFiltros(query);
          return res.status(200).json({
            total: resultado.total,
            pagina: query.page,
            porPagina: query.limit,
            produtos: resultado.data
          });
        } catch (error: any) {
          return res.status(400).json({ erro: error.message });
        }
      }
      
}