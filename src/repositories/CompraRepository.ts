import { AppDataSource } from "../config/ormconfig";
import { Compra } from "../entities/Compra";
import { Repository } from "typeorm";

export class CompraRepository {
    private repo: Repository<Compra>;

    constructor() {
        this.repo = AppDataSource.getRepository(Compra);
    }

    async salvar(compra: Compra): Promise<Compra> {
        return this.repo.save(compra);
    }

    async listarPorCliente(clienteId: number): Promise<Compra[]> {
        return this.repo.find( { where: { cliente: { id: clienteId }}} );
    }

    async buscarPorId(id: number): Promise<Compra | null> {
        return this.repo.findOne( { where: { id } });
    }

    async atualizar(compra: Compra): Promise<Compra> {
        return this.repo.save(compra);
    }
}