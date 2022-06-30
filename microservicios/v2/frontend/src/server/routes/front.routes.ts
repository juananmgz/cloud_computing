import express, { Request, Response, Router } from "express";
import config from "../../../config";
import { DrinkController } from "../../controllers/drink.controller";

const frontRouter: Router = express.Router();

/* VISTAS PUBLICAS */

/* Bebidas */
frontRouter.get("/", async (_req: Request, res: Response) => {
  const drinks = await DrinkController.getDrinks(_req);

  const finalData = {
    drinks: drinks,
  }

  res.render(`${config.rootFolder}/src/views/main.ejs`, finalData);
});

export default frontRouter;