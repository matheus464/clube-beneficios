import bcrypt from "bcryptjs";
import { ClienteRepository } from "../repositories/ClienteRepository";
import { Cliente } from "../entities/Cliente";


export class ClienteService {

    private clienteRepo = new ClienteRepository;

    constructor() {
        this.clienteRepo = new ClienteRepository();
    }

    async criarCliente(nome: string, email: string, senha: string): Promise<Cliente> {
        const clientExistente = await this.clienteRepo.buscarPorEmail(email);
        if (clientExistente) throw new Error("email já cadastrado");

        const senhaCriptografada = await bcrypt.hash(senha, 10);
        const novoCliente = new Cliente();
        Object.assign(novoCliente, { nome, email, senha: senhaCriptografada});

        const clienteSalvo = await this.clienteRepo.salvar(novoCliente);
        if (!clienteSalvo){
            throw new Error("Falha para salvar cliente")
        }

        return clienteSalvo;
    }

    async listarCliente(): Promise<Cliente[]> {
        return this.clienteRepo.listarTodos();
    }

}