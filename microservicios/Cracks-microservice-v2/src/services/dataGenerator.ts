
// import { v4 as uuidv4 } from "uuid";
// import database from "../database/database";
// import { CrackEntity } from "../database/entities/crack.entity";


export class InitCracks {
  public static async initCracks() {

    // const cracksOnDB: CrackEntity[] = await database
    //   .getConnection()
    //   .getRepository(CrackEntity)
    //   .find();

    // if (cracksOnDB.length === 0) {
    //   const crack1: CrackEntity = new CrackEntity();
    //   const crack2: CrackEntity = new CrackEntity();
    //   const crack3: CrackEntity = new CrackEntity();


    //   crack1.id = uuidv4();
    //   crack1.date = new Date("2021-09-10 12:00:00");
    //   crack1.price_on_crack = 2.50;

    //   crack2.id = uuidv4();
    //   crack2.date = new Date("2021-12-04 12:00:00");
    //   crack2.price_on_crack = 2.25;

    //   crack3.id = uuidv4();
    //   crack3.date = new Date("2021-06-01 12:00:00");
    //   crack3.price_on_crack = 2.00;


    //   await database
    //     .getConnection()
    //     .getRepository(CrackEntity)
    //     .save([crack1, crack2, crack3]);


    //   console.log("Cracks saved on cracksArray");

    // } else {
    //   console.log("There are already cracks on database, skipping...");
    // }

  }
}

