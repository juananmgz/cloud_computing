import { Repository } from "typeorm";
import database from "../database/database";
import { DrinkEntity } from "../database/entities/drink.entity";
import { Request } from "express";
import { v4 as uuidv4 } from "uuid";

export class DrinkModel {
  private static repository: Repository<DrinkEntity>;

  public static async getDrinks(): Promise<DrinkEntity[]> {
    try {
      this.repository = await database.getConnection().getRepository(DrinkEntity);
      return await this.repository.find();
    } catch (err) {
      throw Error(err);
    }
  }

  public static async getDrinkById(id: string): Promise<DrinkEntity> {
    try {
      this.repository = await database.getConnection().getRepository(DrinkEntity);
      return await this.repository.findOne({ id: id });
    } catch (err) {
      throw Error(err);
    }
  }

  public static async saveDrink(drink: DrinkEntity): Promise<DrinkEntity> {
    try {

      if (!drink.id) {
        drink.id = uuidv4();
      }

      this.repository = await database.getConnection().getRepository(DrinkEntity);
      await this.repository.save(drink);
      return await this.repository.findOne({ id: drink.id });
    } catch (err) {
      throw Error(err);
    }
  }

  public static async deleteDrinkById(id: string): Promise<boolean> {
    const drink_val: DrinkEntity = await this.getDrinkById(id);
    if(drink_val) {
      try {
        this.repository = await database.getConnection().getRepository(DrinkEntity);
        await this.repository.delete(drink_val);
        return true;
      } catch (err) {
        throw Error(err);
      }
    } else {
      return false;
    }
  }

  public static async updateDrink(drink: DrinkEntity): Promise<DrinkEntity> {
    try {
      this.repository = await database.getConnection().getRepository(DrinkEntity);
      await this.repository.save(drink);
      return await this.repository.findOne({ id: drink.id });
    } catch (err) {
      throw Error(err);
    }
  }

}
