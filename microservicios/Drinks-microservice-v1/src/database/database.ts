import { Connection, createConnection } from "typeorm";
import { DrinkEntity } from "./entities/drink.entity";
import dotenv from "dotenv";

export class Database {
  private connection: Connection;

  public async initDatabase() {
    try {
      dotenv.config();
      this.connection = await createConnection({
        type: "mysql",
        host: process.env.DATABASE_ROUTE,
        port: 3306,
        username: process.env.DATABASE_USER,
        password: process.env.PASSWORD,
        database: process.env.DATABASE,
        entities: [DrinkEntity],
        synchronize: true,
      });

      console.log("[DRINKS] database - created");

      return this.connection;
    } catch(err) {
      dotenv.config();
      this.connection = await createConnection({
        type: "mysql",
        host: process.env.DATABASE_ROUTE,
        port: 3306,
        username: process.env.DATABASE_USER,
        password: process.env.PASSWORD,
        database: process.env.DATABASE,
        entities: [DrinkEntity],
      });

      console.log("[DRINKS] database - already created");

      return this.connection;
    }
  }

  public getConnection(): Connection {
    return this.connection;
  }
}

const database = new Database();
export default database;
