import produtoRoutes from './routes/ProdutoRoutes';
import clienteRoutes from './routes/ClienteRoutes';
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import helmet from "helmet";
import { AppDataSource } from "./config/ormconfig";
import authRoutes from './routes/AuthRoutes';

dotenv.config();
const app = express();

app.use(cors());
app.use(helmet());
app.use(express.json());
app.use("/api", clienteRoutes);
app.use("/api", produtoRoutes);
app.use("/api", authRoutes);

AppDataSource.initialize().then(() => {
    app.listen(process.env.PORT, () => 
    console.log(`Servidor rodando na porta ${process.env.PORT}`));
})