import DoacaoController from "../controllers/doacaoController";
import { Router } from "express";

const doacaoRoutes = Router();

doacaoRoutes.post("/doacoes", DoacaoController.createDoacao);
doacaoRoutes.get("/doacoes/:id", DoacaoController.getDoacaoById);
doacaoRoutes.put("/doacoes/:id", DoacaoController.updateDoacao);

export default doacaoRoutes;
