import { ICrack } from "../schemas/cracks.schema";

export class CrackEntity implements Partial<ICrack> {
  id: string;
  date: Date;
  crackEnd: Date;
  price_on_crack: number;
  isPerc: Boolean;
  active: Boolean;

  constructor (crack: Partial<ICrack>) {
    this.id = crack.id;
    this.date = crack.date;
    this.crackEnd = crack.crackEnd;
    this.price_on_crack = crack.price_on_crack;
    this.isPerc = crack.isPerc;
    this.active = crack.active;
  }
}