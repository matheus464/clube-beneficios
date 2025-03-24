import { Router } from "express";
import { CompraController } from "../controllers/CompraController";
import { autenticarJWT } from "../middlewares/authMiddleware";

const router = Router();
const controller = new CompraController();

// async necessário para garantir compatibilidade com a tipagem do Express.
router.post("/compras", autenticarJWT, async (req, res) => { 
    await controller.registrar(req, res)
});

router.get("/compras", autenticarJWT, async (req, res) => {
    await controller.listar(req, res);
});

export default router;