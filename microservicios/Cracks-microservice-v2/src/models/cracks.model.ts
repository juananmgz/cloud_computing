//import {ParamsDictionary} from "express-serve-static-core";
import { CrackEntity } from "../database/entities/crack.entity";
import Crack, { ICrack } from "../database/schemas/cracks.schema";

export class CrackModel {

  public static async getCracks(): Promise<CrackEntity[]> {
    try {
      const result = await Crack.find();
      return result.map((crack: ICrack) => {
        return new CrackEntity(crack);
      });
    } catch (err) {
      throw Error(err);
    }
  }

  public static async getCrackById(id: string): Promise<CrackEntity> {
    try {
      const result = await Crack.findOne({ id: id });
      return new CrackEntity(result);
    } catch (err) {
      throw Error(err);
    }
  }

  public static async saveCrack(crack: ICrack): Promise<CrackEntity> {
    try {
      const checkCrack = await Crack.find({
        id: crack.id,
        date: crack.date,
        crackEnd: crack.crackEnd,
        price_on_crack: crack.price_on_crack,
        active: true,
      });

      if(checkCrack.length !== 0) {
        throw Error("[!] Campos duplicados");
      }

      await crack.save();
      return new CrackEntity(crack);
    } catch (err) {
      throw Error(err);
    }
  }

  public static async endCrack(crack: ICrack): Promise<CrackEntity> {
    try {
      const checkCrack = await Crack.findOne({
        id: crack.id
      });

      if(!checkCrack) {
        throw Error("[!] No hay ningún CRACK con esos datos");
      }

      checkCrack.active = crack.active

      await checkCrack.save();
      return new CrackEntity(crack);
    } catch (err) {
      throw Error(err);
    }
  }


  public static async deleteCrackById(crack: ICrack): Promise<boolean> {
    const checkCrack = await Crack.find({
      id: crack.id,
    });

    if(checkCrack.length !== 0) {
      Crack.deleteOne({ id: crack.id }, function (err) {
        if (err) {
          console.log(err);
        };
      });

      return true;
    }
    return false;
  }
}
