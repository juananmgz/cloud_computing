import database from "./database/database";
import { InitDrinks } from "./services/dataGenerator";

database.initDatabase().then(async () => {
  await InitDrinks.initDrinks();
  process.exit(0);
}).catch((error) => {
  throw new Error(error);
});
