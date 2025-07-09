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

  const [selectedColorFilter, setSelectedColorFilter] = useState<string[]>([]);

  const filteredProducts = products
    // ZMIANA TUTAJ: Poprawiona logika filtrowania kolorów
    .filter(p => {
      // Jeśli nie wybrano filtrów kolorów, zwróć produkt (true)
      if (selectedColorFilter.length === 0) {
        return true;
      }
      // W przeciwnym razie sprawdź, czy tablica kolorów produktu
      // zawiera chociaż jeden z kolorów wybranych w filtrze.
      return selectedColorFilter.some(color => p.colors.includes(color));
    })
    // 2. Filtruj po tekście z paska wyszukiwania (bez zmian)
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
  if(error) {
    return (
      <div className="container">
        <NavBar />
        <h1>{error}</h1>
      </div>
    )
  }

  return (
    <div className="container">
      <NavBar searching={searching} onSearch={(value: string) => setFilter(value)} setSearching={(value: boolean) => setSearching(value)} showFilterButton={true} selectedColorFilter={selectedColorFilter} setSelectedColorFilter={setSelectedColorFilter}/>
      <div className="products">
        {filteredProducts.map((p, index) => (
          <ProductCard product={p} key={index+1} startColor={p.colors.find(color => selectedColorFilter.includes(color)) || p.colors[0]}/>
        ))}
        {filteredProducts.length === 0 && <p>Brak produktów spełniających kryteria.</p>}
      </div>
    </div>
  )
}

export default Store;