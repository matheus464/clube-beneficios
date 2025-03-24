import { CompraRepository } from "../repositories/CompraRepository";

export class RelatorioService {
    private compraRepo = new CompraRepository();

    async gerarRelatorioDeVendas() {
        const compras = await this.compraRepo.listarPagas();

        return compras.map((compra) => ({
            id: compra.id,
            clientes: {
                id: compra.cliente.id,
                nome: compra.cliente.nome,
                email: compra.cliente.email
            },
            produtos: compra.produtos.map((p) => ({
                id: p.id,
                nome: p.nome,
                preco: p.preco
            })),
            valorTotal: compra.produtos.reduce((soma, p) => soma + Number(p.preco), 0),
            status: compra.status,
            data: compra.data
        }));
    }
}