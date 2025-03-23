import { Router } from "express";
import { ClienteController } from "../controllers/ClienteController";
import { autenticarJWT } from "../middlewares/authMiddleware";
import { verificarAdmin } from "../middlewares/adminMiddleware";

const router = Router();
const clienteController = new ClienteController();

router.post("/clientes", (req, res) => clienteController.cadastrar(req,res));
router.get("/clientes", autenticarJWT, verificarAdmin, (req, res) => {
    clienteController.listar(req, res);
});

export default router;