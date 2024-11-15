import { Express, Request, Response } from "express";
import express from "express";
import doadorRoutes from "./doadorRoutes";
import doacaoRoutes from "./doacaoRoutes";

const routes = (app: Express) => {
  app
    .route("/")
    .get((req: Request, res: Response) => res.status(200).send("API Node.js"));
  app.use(express.json(), doadorRoutes, doacaoRoutes);
};

export default routes;
