import { useEffect, useState } from 'react';
import './index.css'
import type { Product } from '../../models/Product';
import AxiosInstance from '../../api/AxiosInstance';
import ProductCard from '../../components/ProductCard';
import NavBar from '../../components/NavBar';
import { useLocation } from 'react-router-dom';

const Store = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [error, setError] = useState("");
  const [filter, setFilter] = useState("");
  const { searching } = useLocation().state ?? false;
  console.log(searching)
  console.log(filter)

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
    <div className="container">
      <NavBar searching={searching} onSearch={(value: string) => setFilter(value)}/>
      {error && (
        <h1>{error}</h1>
      )}
      <div className="products">
        {products.filter(p => filter === '' || p.name.toLowerCase().includes(filter.toLowerCase()) || p.price.toString().includes(filter.toLowerCase())).map((p, index) => (
          <ProductCard product={p} key={index+1}/>
        ))}
      </div>
    </div>
  )
}

export default Store;