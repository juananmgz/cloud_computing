import mongoose from "mongoose";

export class Database {
  public async initDatabase() {
    try {
      mongoose.connect(`mongodb://${process.env.HOST}:${process.env.DATABASE_PORT}/cracksdb`);

      console.log("[CRACKS] database - created");
    } catch (err) {
      throw Error(err);
    }
  }
}

const database = new Database();
export default database;