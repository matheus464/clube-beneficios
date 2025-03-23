import { Response, NextFunction } from "express";
import { AuthRequest } from "./authMiddleware";

export function verificarAdmin(req: AuthRequest, res: Response, next: NextFunction) {
    if (req.user?.tipoUsuario !== "admin"){
        res.status(403).json({ erro: "Acesso restrito a administradores"});
        return;
    }

    next();
}