import database from "./database/database";
import app from "./server/server";

database.initDatabase().then(() => {
  app.listen(4000, () => {
    return console.log(
      `${new Date()} server is listening on 4000`
    );
  });
});
