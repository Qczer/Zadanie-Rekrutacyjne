import type { Product } from "./Product";
import type { ProductVariant } from "./ProductVariant";

export default interface CartItem {
  // A unique ID for the cart item, e.g., `${productId}-${variantId}`
  id: string; 
  product: Product; // The parent product for display purposes (name, image)
  variant: ProductVariant; // The specific variant being purchased
  amount: number;
}