import { NextFunction, Request, Response } from "express";
import  jwt  from "jsonwebtoken";

export interface AuthRequest extends Request {
    user?: any;
}

export function autenticarJWT(req: AuthRequest, res: Response, next: NextFunction) {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        res.status(401).json( { erro: "Token não fornecido" });
        return;
    }

    const token = authHeader.split(" ")[1];

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET as string);
        req.user = decoded;
        next();
    } catch (error) {
        res.status(403).json( { erro: "Token inválido" });
        return;
    }
}