import { useMemo, useState } from 'react';
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

  const [selectedColor, setSelectedColor] = useState<string | null>(null);

  const allColors = useMemo(() => {
    if (!products || products.length === 0) return [];
    
    // 1. flatMap tworzy jedną tablicę ze wszystkich tablic 'colors'
    const colors = products.flatMap(p => p.colors);
    // 2. new Set() usuwa duplikaty
    // 3. [...] zamienia zbiór (Set) z powrotem na tablicę
    return [...new Set(colors)];
  }, [products]);

  const filteredProducts = products
    // 1. Filtruj po wybranym kolorze (jeśli jest wybrany)
    .filter(p => selectedColor ? p.colors.includes(selectedColor) : true)
    // 2. Filtruj po tekście z paska wyszukiwania (jeśli jest wpisany)
    .filter(p => filter === '' ? true : (
      p.name.toLowerCase().includes(filter.toLowerCase()) || 
      p.price.toString().includes(filter.toLowerCase())
    ));

  if(products.length === 0 && !error) {
    return (
      <div className="container">
        <NavBar />
        <h2>Loading products...</h2>
      </div>
    )
  }

  return (
    <div className="container">
      <NavBar searching={searching} onSearch={(value: string) => setFilter(value)} setSearching={(value: boolean) => setSearching(value)}/>
      {error && 
        (<h1>{error}</h1>)
      }
      {!error &&
        (<div className="products">
          {/* Używamy nowej, przefiltrowanej listy produktów */}
          {filteredProducts.map((p, index) => (
            <ProductCard product={p} key={p.id}/> // Lepiej używać p.id jako klucza
          ))}
          {/* Informacja, gdy filtry nie zwrócą żadnych wyników */}
          {filteredProducts.length === 0 && <p>Brak produktów spełniających kryteria.</p>}
        </div>)
      }
    </div>
  )
}

export default Store;