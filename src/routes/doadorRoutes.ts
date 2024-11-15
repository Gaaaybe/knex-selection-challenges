import DoadorController from "../controllers/doadorController";
import { Router } from "express";

const doadorRoutes = Router();

doadorRoutes.post("/doadores", DoadorController.createDoador);
doadorRoutes.get("/doadores/:id", DoadorController.getDoadorById);
doadorRoutes.put("/doadores/:id", DoadorController.updateDoador);

export default doadorRoutes;
