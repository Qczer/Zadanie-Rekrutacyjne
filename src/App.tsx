import { useEffect, useState } from 'react';
import './App.css'
import type { Product } from './models/Product';
import AxiosInstance from './api/AxiosInstance';

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
      {products.map((p) => (
        <div key={p.id}><p>{p.name} - {p.price} zł</p></div>
      ))}
    </>
  )
}

export default App
