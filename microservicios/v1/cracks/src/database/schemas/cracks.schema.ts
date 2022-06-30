import { Schema, model, Document } from "mongoose";

export interface ICrack extends Document {
  id: string;
  date: Date;
  crackEnd: Date;
  price_on_crack: number;
  isPerc: Boolean;
  active: Boolean;
}

const CrackSchema = new Schema({
  id: { type: String, required: true },
  crackEnd: { type: Date, default: Date.now },
  date: { type: Date, default: Date.now },
  price_on_crack: { type: Number },
  isPerc: { type: Boolean },
  active: { type: Boolean },
});

export default model<ICrack>("Crack", CrackSchema);