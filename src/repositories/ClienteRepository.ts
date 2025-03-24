import { AppDataSource } from "../config/ormconfig";
import { Repository } from "typeorm";
import { Cliente } from "../entities/Cliente";

export class ClienteRepository {
    private repo: Repository<Cliente>

    constructor() {
        this.repo = AppDataSource.getRepository(Cliente);
    }

    async salvar(cliente: Cliente): Promise<Cliente | null> {
        return this.repo.save(cliente);
    }

    async buscarPorId(id: number): Promise<Cliente | null> {
        return this.repo.findOne( { where: { id }});
    }

    async buscarPorEmail(email: string): Promise<Cliente | null> {
        return this.repo.findOne({ where: { email } });
    }

    async listarTodos(): Promise<Cliente[]> {
        return this.repo.find()
    }
}

