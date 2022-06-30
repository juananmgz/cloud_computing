import { Request } from "express";
import { Drink } from "../models/drinks.model";

import fetch from 'node-fetch';

export interface GetDrink {
  drinkData: Drink;
}

export interface GetDrinks {
  totalDrink: number;
  drinks: Drink[];
}

export class DrinkController {
  public static async GetDrinkById(req: Request): Promise<GetDrink> {
    const response = await fetch(`http://${process.env.ROUTER_ROUTE}:4002/drinks/${req.params.id}`);

    // return await {
    //   drinkData: await response.json(),
    // };

    const newDrink : GetDrink = null;
    return newDrink;
  }


  public static async getDrinks(req: Request) {
    const response = await fetch(`http://${process.env.ROUTER_ROUTE}:4002/drinks`);

    return await response.json()
  }
}
