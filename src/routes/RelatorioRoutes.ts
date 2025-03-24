import { Router } from "express";
import { RelatorioController } from "../controllers/RelatorioController";
import { autenticarJWT } from "../middlewares/authMiddleware";
import { verificarAdmin } from "../middlewares/adminMiddleware";

const router = Router();
const controller = new RelatorioController();

router.get("/relatorios/vendas", autenticarJWT, verificarAdmin, async (req, res) => {
    await controller.vendas(req, res);
});

export default router;