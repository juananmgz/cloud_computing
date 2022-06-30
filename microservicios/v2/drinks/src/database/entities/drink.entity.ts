import { Entity, Column, PrimaryColumn } from "typeorm";

@Entity({ name: "drinks" })
export class DrinkEntity {
  @PrimaryColumn()
  id: string;
  @Column("varchar", { length: 100 })
  name: string;
  @Column("decimal", { precision: 5, scale: 2 })
  price_base: number;
  @Column("decimal", { precision: 5, scale: 2 })
  price: number;
}
