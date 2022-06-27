import express, { Request, Response, Router } from "express";
import { DrinkEntity } from "../../database/entities/drink.entity";
import { DrinkModel } from "../../models/drinks.model";


const drinksRouter: Router = express.Router();

drinksRouter.get("/drinks", async (_req: Request, res: Response) => {
  res.header("X-version", "1");

  try {
    const drinks: DrinkEntity[] = await DrinkModel.getDrinks();
    drinks.length > 0
    // Cambio version 2
      ? res.status(200).send(JSON.stringify({drinks: drinks}))
      : res.status(203).send([]);
  } catch (err) {
    res.status(500).json({ status: 500, message: err.message });
  }
});

drinksRouter.get("/drinks/:id", async (req: Request, res: Response) => {
  res.header("X-version", "1");

  try {
    const drink: DrinkEntity = await DrinkModel.getDrinkById(req.params.id);
    drink
      ? res.status(200).send(drink)
      : res.status(203).send({});
  } catch (err) {
    res.status(500).json({ status: 500, message: err.message });
  }
});

drinksRouter.delete("/drinks/:id", async (req: Request, res: Response) => {
  res.header("X-version", "1");

  try {
    const result: Boolean = await DrinkModel.deleteDrinkById(req.params.id);
    result
      ? res.status(202).send(result)
      : res.status(404).send({});
  } catch (err) {
    res.status(500).json({ status: 500, message: err.message });
  }
});

drinksRouter.post("/drinks", async (req: Request, res: Response) => {
  res.header("X-version", "1");

  try {
    const drink: DrinkEntity = new DrinkEntity();

    drink.id = req.body.id;
    drink.name = req.body.name;
    drink.price = req.body.price;
    drink.price_base = req.body.price_base;

    const createdDrink: DrinkEntity = await DrinkModel.saveDrink(drink);

    createdDrink
      ? res.status(201).send(createdDrink)
      : res.status(500).send({});
  } catch (err) {
    res.status(500).json({ status: 500, message: err.message });
  }
});

drinksRouter.put("/drinks/:id", async (req: Request, res: Response) => {
  res.header("X-version", "1");

  try {
    const drink: DrinkEntity = new DrinkEntity();

    drink.id = req.params.id;
    drink.name = req.body.name;
    drink.price = req.body.price;
    drink.price_base = req.body.price_base;

    const updatedDrink: DrinkEntity = await DrinkModel.saveDrink(drink);

    updatedDrink
      ? res.status(204).send(updatedDrink)
      : res.status(500).send({});
  } catch (err) {
    res.status(500).json({ status: 500, message: err.message });
  }
});

drinksRouter.put("/drinks/admin/cracks", async (req: Request, res: Response) => {
  res.header("X-version", "1");

  try {
    const drinksList: DrinkEntity[] = await DrinkModel.getDrinks();
    drinksList.forEach(async (d) => {
      d.price = req.body.price_on_crack;
      await DrinkModel.saveDrink(d);
    });

    res.status(201).send(true);
  } catch (err) {
    res.status(500).json({ status: 500, message: err.message });
  }
});

drinksRouter.put("/drinks/admin/resetPrices", async (req: Request, res: Response) => {
  res.header("X-version", "1");

  try {
    const drinksList: DrinkEntity[] = await DrinkModel.getDrinks();
    drinksList.forEach(async (d) => {
      d.price = d.price_base;
      await DrinkModel.saveDrink(d);
    });

    res.status(201).send(true);
  } catch (err) {
    res.status(500).json({ status: 500, message: err.message });
  }
});

export default drinksRouter;
