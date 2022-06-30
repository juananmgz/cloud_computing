import mongoose from "mongoose";

export class Database {
  public async initDatabase() {
    try {
      mongoose.connect(`mongodb://${process.env.USER}:${process.env.PASSWORD}@${process.env.HOST}:27017`);

      console.log("[CRACKS] database - created");
    } catch (err) {
      console.log("[CRACKS] database - already created, skipping");
    }
  }
}

const database = new Database();
export default database;