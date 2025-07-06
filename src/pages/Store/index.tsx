import { useState } from 'react';
import './index.css'
import ProductCard from '../../components/ProductCard';
import NavBar from '../../components/NavBar';
import { useLocation } from 'react-router-dom';
import { useProducts } from '../../contexts/Products';

const Store = () => {
  const { products, error } = useProducts()
  const [filter, setFilter] = useState("");
  const { startSearching } = useLocation().state ?? false;
  const [searching, setSearching] = useState(startSearching);

  return (
    <div className="container">
      <NavBar searching={searching} onSearch={(value: string) => setFilter(value)} setSearching={(value: boolean) => setSearching(value)}/>
      {error && 
        (<h1>{error}</h1>)
      }
      {!error &&
        (<div className="products">
          {products.filter(p => filter === '' || p.name.toLowerCase().includes(filter.toLowerCase()) || p.price.toString().includes(filter.toLowerCase())).map((p, index) => (
            <ProductCard product={p} key={index+1}/>
          ))}
        </div>)
      }
    </div>
  )
}

export default Store;