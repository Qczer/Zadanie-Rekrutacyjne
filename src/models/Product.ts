import type { OrderProduct } from "./OrderProduct";

export default interface Product {
  id: number;
  name: string;
  price: number;
  orderProduct: OrderProduct[];
}