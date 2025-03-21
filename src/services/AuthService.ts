import { ClienteRepository } from "../repositories/ClienteRepository";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { Cliente } from "../entities/Cliente";

export class AuthService {
    private clienteRepo = new ClienteRepository();

    async autenticar(email: string, senha: string): Promise<{ token: string, cliente: Cliente}> {
        const cliente = await this.clienteRepo.buscarPorEmail(email);
        if (!cliente) {
            throw new Error("Email ou senha inválidos");
        }

        const senhaValida = await bcrypt.compare(senha, cliente.senha);
        if (!senhaValida) {
            throw new Error("Email ou senha inválidos");
        }

        const token = jwt.sign(
            {
                id: cliente.id,
                tipoUsuario: cliente.tipoUsuario,
                email: cliente.email
            },
            process.env.JWT_SECRET as string,
            { expiresIn: "2h"}
        );

        return { token, cliente };
    }
}