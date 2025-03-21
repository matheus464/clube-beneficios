import { Router } from "express";
import { AuthController } from "../controllers/AuthController";

const router = Router();
const authController = new AuthController();

router.post("/login", async (req, res, next) => {
    try {
      await authController.login(req, res);
    } catch (error) {
      next(error);
    }
});

export default router;