import type { OrderProduct } from "./OrderProduct";

export type Product = {
  id: number;
  name: string;
  price: number;
  orderProduct: OrderProduct[];
}