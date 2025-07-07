import { useEffect, useMemo, useState } from "react";
import type { Product } from "../../models/Product";
import ProductsContext from "./ProductsContext";
import AxiosInstance from "../../api/AxiosInstance";

const ProductsProvider = ({ children }: { children: React.ReactNode }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [error, setError] = useState("");
  const value = useMemo(() => ({ products, setProducts, error, setError }), [products, setProducts, error, setError]);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const res = await AxiosInstance.get('/products');
        setProducts(res.data);
      }
      catch (err) {
        console.error(err);
        setError('Nie udało się załadować produktów')
      }
    }
    fetchProducts();
  }, []);

  return (
    <ProductsContext.Provider value={value}>
      {children}
    </ProductsContext.Provider>
  );
}

export default ProductsProvider;