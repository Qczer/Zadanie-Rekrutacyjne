import type { Product } from "./Product";

export default interface CartItem {
  id: string;
  product: Product;
  amount: number;
  color: string;
  size: string;
}