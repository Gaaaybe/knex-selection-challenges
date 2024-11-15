import DoacaoController from "../controllers/doacaoController";
import { Router } from "express";

const doacaoRoutes = Router();

doacaoRoutes.get("/doacoes", DoacaoController.getDoacoes);
doacaoRoutes.get("/doacoes/filtrar", DoacaoController.filterDoacoes);
doacaoRoutes.post("/doacoes", DoacaoController.createDoacao);
doacaoRoutes.get("/doacoes/:id", DoacaoController.getDoacaoById);
doacaoRoutes.get("/doacoes/:id/status", DoacaoController.getDoacaoStatus);
doacaoRoutes.put("/doacoes/:id", DoacaoController.updateDoacao);
doacaoRoutes.delete("/doacoes/:id", DoacaoController.deleteDoacao);

export default doacaoRoutes;
