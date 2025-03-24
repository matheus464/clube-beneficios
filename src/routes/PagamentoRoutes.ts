import { Router } from "express";
import { PagamentoController } from "../controllers/PagamentoController";
import { autenticarJWT } from "../middlewares/authMiddleware";

const router = Router();
const controller = new PagamentoController();

router.post("/pagamentos", autenticarJWT, async (req, res) => {
    controller.pagar(req, res);
});

export default router;