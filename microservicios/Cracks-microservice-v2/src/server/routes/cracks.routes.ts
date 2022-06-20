import express, { Request, Response, Router } from "express";
import { CrackEntity } from "../../database/entities/crack.entity";
import { CrackModel } from "../../models/cracks.model";
import Crack, { ICrack } from "../../database/schemas/cracks.schema";
import { v4 as uuidv4 } from "uuid";

const cracksRouter: Router = express.Router();

cracksRouter.get("/cracks", async (_req: Request, res: Response) => {
  res.header("X-version", "2");

  try {
    const cracks: CrackEntity[] = await CrackModel.getCracks();
    cracks.length > 0
      ? res.status(200).send(JSON.stringify({ totalCracks: cracks.length, cracks: cracks }))
      : res.status(404).send([]);
  } catch (err) {
    res.status(500).json({ status: 500, message: err.message });
  }
});

cracksRouter.get("/cracks/:id", async (req: Request, res: Response) => {
  res.header("X-version", "2");

  try {
    const crack = await CrackModel.getCrackById(req.params.id);
    crack
      ? res.status(200).send(JSON.stringify(crack))
      : res.status(404).send([]);
  } catch (err) {
    res.status(500).json({ status: 500, message: err.message });
  }
});

cracksRouter.post("/cracks", async (req: Request, res: Response) => {
  res.header("X-version", "2");

  try {
    const id = uuidv4();
    const date = new Date();
    const crackEnd = new Date(date.getTime() + Number(req.body.addingMinutes)*60000);

    //Cambio version2
    const price_on_crack = 1 - (req.body.price_on_crack / 100);
    console.log(price_on_crack);

    const isPerc = true;
    const active = true;

    const newCrack: ICrack = new Crack({ id, date, crackEnd, price_on_crack, isPerc, active });

    newCrack
      ? res.status(201).send(JSON.stringify(await CrackModel.saveCrack(newCrack)))
      : res.status(404).send([]);
  } catch (err) {
    res.status(500).json({ status: 500, message: err.message });
  }
});

cracksRouter.put("/cracks/:id/end", async (req: Request, res: Response) => {
  res.header("X-version", "2");

  try {
    const crack = await CrackModel.getCrackById(req.params.id);

    const id = req.params.id;
    const date = crack.date;
    const crackEnd = crack.crackEnd;
    const price_on_crack = 1 - (req.body.price_on_crack / 100);
    const isPerc = true;
    const active = false;
    const newCrack: ICrack = new Crack({ id, date, crackEnd, price_on_crack, isPerc, active });

    newCrack
      ? res.status(201).send(JSON.stringify(await CrackModel.endCrack(newCrack)))
      : res.status(404).send([]);
  } catch (err) {
    res.status(500).json({ status: 500, message: err.message });
  }
});

cracksRouter.delete("/cracks/:id", async (req: Request, res: Response) => {
  res.header("X-version", "2");

  try {
    const id = req.params.id;
    const newCrack: ICrack = new Crack({ id });
    const result: Boolean = await CrackModel.deleteCrackById(newCrack);
    result
      ? res.status(202).send(result)
      : res.status(404).send({});
  } catch (err) {
    res.status(500).json({ status: 500, message: err.message });
  }
});

export default cracksRouter;
