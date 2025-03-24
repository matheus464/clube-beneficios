import { ProdutoRepository } from "../repositories/ProdutoRepository";
import { Produto } from "../entities/Produto";

export class ProdutoService {
    private produtoRepo: ProdutoRepository;

    constructor() {
        this.produtoRepo = new ProdutoRepository();
    }

    async criarProduto(dados: Partial<Produto>): Promise<Produto> {
        const novoProduto = new Produto();
        Object.assign(novoProduto, dados);
        return this.produtoRepo.salvar(novoProduto);
    }

    async listarProdutos(): Promise<Produto[]> {
        return this.produtoRepo.listarTodos();
    }

    async listarComFiltros(query: any): Promise<{ data: Produto[]; total: number}> {
        return this.produtoRepo.buscarComFiltros(query);
    }
}