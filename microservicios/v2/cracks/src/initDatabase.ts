import database from "./database/database";
import { InitCracks } from "./services/dataGenerator";

database.initDatabase().then(async () => {
  await InitCracks.initCracks();
  process.exit(0);
}).catch((error) => {
  throw new Error(error);
});
