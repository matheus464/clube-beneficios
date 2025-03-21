import { Router } from "express";
import { ProdutoController } from "../controllers/ProdutoController";

const router = Router();
const produtoController = new ProdutoController();

router.post("/produtos", (req, res) => produtoController.cadastrar(req, res));
router.get("/produtos", (req, res) => produtoController.listar(req, res));

export default router;