import { Request, Response } from "express";
import { AuthService } from "../services/AuthService";

export class AuthController {
    private authService = new AuthService();

    async login(req: Request, res: Response) {
        const { email, senha } = req.body;

        if (!email || !senha) {
            return res.status(400).json( { erro: "Email e senha são obrigatórios" });
        }

        try {
            const { token, cliente } = await this.authService.autenticar(email, senha);
            return res.status(200).json({
                token,
                cliente: {
                    id: cliente.id,
                    nome: cliente.nome,
                    email: cliente.email,
                    tipoUsuario: cliente.tipoUsuario
                }
            });
        } catch (error: any) {
            return res.status(401).json({ erro: error.message });
        }
    }
}