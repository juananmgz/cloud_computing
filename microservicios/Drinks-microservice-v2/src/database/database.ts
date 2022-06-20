import { Connection, createConnection } from "typeorm";
import { DrinkEntity } from "./entities/drink.entity";
import dotenv from "dotenv";

export class Database {
  private connection: Connection;

  public async initDatabase() {

    dotenv.config();
    this.connection = await createConnection({
      type: "mysql",
      host: process.env.DATABASE_ROUTE,
      port: Number(process.env.DATABASE_PORT),
      username: process.env.DATABASE_USER,
      password: process.env.PASSWORD,
      database: process.env.DATABASE,
      entities: [DrinkEntity],
      synchronize: true,
    });
    console.log("[DRINKS] database - created");

    return this.connection;
  }

  public getConnection(): Connection {
    return this.connection;
  }
}

const database = new Database();
export default database;
