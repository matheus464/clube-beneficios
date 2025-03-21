import bcrypt from "bcryptjs";
import { ClienteRepository } from "../repositories/ClienteRepository";
import { Cliente } from "../entities/Cliente";


export class ClienteService {

    private clienteRepo = new ClienteRepository;

    constructor() {
        this.clienteRepo = new ClienteRepository();
    }

    async criarCliente(dados: { nome: string; email: string; senha: string; tipoUsuario?: string }): Promise<Cliente | null> {
        if (!dados.senha) {
            throw new Error("Senha é obrigatória");
        }

        const clienteExistente = await this.clienteRepo.buscarPorEmail(dados.email);
        if (clienteExistente !== null) {
            throw new Error("Email já cadastrado");
        }

        const senhaCriptografada = await bcrypt.hash(dados.senha, 10);
        const novoCliente = new Cliente();
        Object.assign(novoCliente, {
            nome: dados.nome,
            email: dados.email,
            senha: senhaCriptografada,
            tipoUsuario: dados.tipoUsuario || "cliente"
        });

        return this.clienteRepo.salvar(novoCliente);
    }


    async listarCliente(): Promise<Cliente[]> {
        return this.clienteRepo.listarTodos();
    }

}