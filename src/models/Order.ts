import type { OrderProduct } from "./OrderProduct";

export type Order = {
  Id: number;
  CreatedAt: Date;
  OrderProduct: OrderProduct[];
}