import { v4 as uuidv4 } from "uuid";
import database from "../database/database";
import { DrinkEntity } from "../database/entities/drink.entity";


export class InitDrinks {
  public static async initDrinks() {

    const drinksOnDB: DrinkEntity[] = await database
      .getConnection()
      .getRepository(DrinkEntity)
      .find();

    if (drinksOnDB.length === 0) {
      const drink1: DrinkEntity = new DrinkEntity();
      const drink2: DrinkEntity = new DrinkEntity();
      const drink3: DrinkEntity = new DrinkEntity();
      const drink4: DrinkEntity = new DrinkEntity();
      const drink5: DrinkEntity = new DrinkEntity();
      const drink6: DrinkEntity = new DrinkEntity();


      drink1.id = uuidv4();
      drink1.name = "Barcelo";
      drink1.price = 3.50;
      drink1.price_base = 3.50;

      drink2.id = uuidv4();
      drink2.name = "Larios";
      drink2.price = 3.00;
      drink2.price_base = 3.00;

      drink3.id = uuidv4();
      drink3.name = "Eristoff";
      drink3.price = 3.00;
      drink3.price_base = 3.00;

      drink4.id = uuidv4();
      drink4.name = "Ballantines";
      drink4.price = 3.50;
      drink4.price_base = 3.50;

      drink5.id = uuidv4();
      drink5.name = "BullDog";
      drink5.price = 4.00;
      drink5.price_base = 4.00;

      drink6.id = uuidv4();
      drink6.name = "Malibú";
      drink6.price = 3.00;
      drink6.price_base = 3.00;


      await database
        .getConnection()
        .getRepository(DrinkEntity)
        .save([drink1, drink2, drink3, drink4, drink5, drink6]);


      console.log("Drinks saved on drinksArray");

    } else {
      console.log("There are already drinks on database, skipping...");
    }

  }
}

