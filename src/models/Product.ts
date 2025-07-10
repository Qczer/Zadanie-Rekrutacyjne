import type { ProductVariant } from "./ProductVariant";

export interface Product {
  id: number;
  name: string;
  imageUrl: string;
  description: string;
  variants: ProductVariant[];
}