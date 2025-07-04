import type { Product } from "./Product";
import type { Order } from "./Order";

export type OrderProduct = {
  OrderId: number;
  Order: Order;
  ProductId: number;
  Product: Product;
}