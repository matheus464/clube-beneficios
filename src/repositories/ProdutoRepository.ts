import { AppDataSource } from "../config/ormconfig";
import { Produto } from "../entities/Produto";
import { Repository } from "typeorm";
import { In } from "typeorm";

export class ProdutoRepository {
    private repo: Repository<Produto>;

    constructor() {
        this.repo = AppDataSource.getRepository(Produto);
    }

    async buscarPorId(id: number): Promise<Produto | null> {
        return this.repo.findOne( { where: { id }});
    }

    async buscarPorIds(ids: number[]): Promise<Produto[]> {
        return this.repo.find( { where: { id: In(ids) } });
    }
    
    async salvar(produto: Produto): Promise<Produto> {
        return this.repo.save(produto);
    }

    async listarTodos(): Promise<Produto[]> {
        return this.repo.find();
    }

    async buscarComFiltros(query: {
        nome?: string;
        categoria?: string;
        precoMin?: number;
        precoMax?: number;
        page?: number;
        limit?: number;
      }): Promise<{ data: Produto[]; total: number }> {
        const { nome, categoria, precoMin, precoMax, page = 1, limit = 10 } = query;
      
        const qb = AppDataSource.getRepository(Produto)
          .createQueryBuilder("produto")
          .skip((page - 1) * limit)
          .take(limit)
          .orderBy("produto.nome", "ASC");
      
        if (nome) {
          qb.andWhere("produto.nome LIKE :nome", { nome: `%${nome}%` });
        }
      
        if (categoria) {
          qb.andWhere("produto.categoria = :categoria", { categoria });
        }
      
        if (precoMin !== undefined) {
          qb.andWhere("produto.preco >= :precoMin", { precoMin });
        }
      
        if (precoMax !== undefined) {
          qb.andWhere("produto.preco <= :precoMax", { precoMax });
        }
      
        const [data, total] = await qb.getManyAndCount();
      
        return { data, total };
      }
}