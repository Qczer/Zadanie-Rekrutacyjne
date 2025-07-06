import type Product from "../../models/Product";

interface ProductsContextType {
  products: Product[];
  setProducts: (value: Product[]) => void;
  error: string;
  setError: (value: string) => void;
}

export type { ProductsContextType };