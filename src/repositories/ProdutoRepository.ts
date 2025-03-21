import { AppDataSource } from "../config/ormconfig";
import { Produto } from "../entities/Produto";
import { Repository } from "typeorm";

export class ProdutoRepository {
    private repo: Repository<Produto>;

    constructor() {
        this.repo = AppDataSource.getRepository(Produto);
    }

    async salvar(produto: Produto): Promise<Produto> {
        return this.repo.save(produto);
    }

    async listarTodos(): Promise<Produto[]> {
        return this.repo.find();
    }

}