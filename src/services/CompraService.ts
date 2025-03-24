import { Compra } from "../entities/Compra";
import { CompraRepository } from "../repositories/CompraRepository";
import { ClienteRepository } from "../repositories/ClienteRepository";
import { ProdutoRepository } from "../repositories/ProdutoRepository";
import { Cliente } from "../entities/Cliente";
import { Produto } from "../entities/Produto";


export class CompraService {
    private compraRepo = new CompraRepository();
    private clienteRepo = new ClienteRepository();
    private produtoRepo = new ProdutoRepository();

    async registrarCompra(clienteId: number, produtosId: number[]): Promise<Compra> {
        const cliente = await this.clienteRepo.buscarPorId(clienteId);
        if (!cliente) throw new Error("Cliente não encontrado");

        const produtos: Produto[] = [];
        for (const id of produtosId) {
            const produto = await this.produtoRepo.buscarPorId(id);
            if (!produto) throw new Error(`Produto com ID ${id} não encontrado`);
            produtos.push(produto);
        }

        const compra = new Compra();
        compra.cliente = cliente;
        compra.produtos = produtos;

        return this.compraRepo.salvar(compra);
    }

    async listarPorCliente(clienteId: number): Promise<Compra[]> {
        return this.compraRepo.listarPorCliente(clienteId);
    }

    async pagarCompra(compraId: number, clienteId: number): Promise<Compra> {
        const compra = await this.compraRepo.buscarPorId(compraId);
        if (!compra) throw new Error("Compra não encontrada");

        if (compra.cliente.id !== clienteId) {
            throw new Error("Você só pode pagar suas próprias compras");
        }

        if (compra.status === "Pago") {
            throw new Error("Compra já foi paga");
        }

        compra.status = "Pago";
        return this.compraRepo.atualizar(compra);
    }
}