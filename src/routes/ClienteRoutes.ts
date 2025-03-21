import { Router } from "express";
import { ClienteController } from "../controllers/ClienteController";

const router = Router();
const clienteController = new ClienteController();

router.post("/clientes", (req, res) => clienteController.cadastrar(req,res));
router.get("/clientes", (req, res) => clienteController.listar(req, res));

export default router;