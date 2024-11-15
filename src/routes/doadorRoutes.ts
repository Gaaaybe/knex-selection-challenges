import DoadorController from "../controllers/doadorController";
import { Router } from "express";
import { validateDoador } from "../middleware/validateDoador";

const doadorRoutes = Router();

doadorRoutes.get("/doadores", DoadorController.getAllDoadores);
doadorRoutes.post("/doadores", validateDoador, DoadorController.createDoador);
doadorRoutes.get(
  "/doadores/:id/doacoes",
  DoadorController.getDoadorWithDoacoes,
);
doadorRoutes.get("/doadores/:id", DoadorController.getDoadorById);
doadorRoutes.put(
  "/doadores/:id",
  validateDoador,
  DoadorController.updateDoador,
);
doadorRoutes.delete("/doadores/:id", DoadorController.deleteDoador);

export default doadorRoutes;
