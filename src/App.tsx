import { useEffect, useState } from 'react';
import './App.css'
import type { Product } from './models/Product';
import AxiosInstance from './api/AxiosInstance';
import ProductCard from './components/ProductCard';

function App() {
  const [products, setProducts] = useState<Product[]>([]);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchProducts() {
      try {
        const res = await AxiosInstance.get('/Products');
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
    <>
      {error && (
        <h1>{error}</h1>
      )}
      {products.map((p, index) => (
        <ProductCard product={p} key={index+1}/>
      ))}
    </>
  )
}

export default App
