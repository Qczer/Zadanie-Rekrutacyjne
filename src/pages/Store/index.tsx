import { useMemo, useState } from 'react';
import './index.css'
import ProductCard from '../../components/ProductCard';
import NavBar from '../../components/NavBar';
import { useLocation } from 'react-router-dom';
import { useProducts } from '../../contexts/Products';
import type { Product } from '../../models/Product';

const Store = () => {
  const { products, error } = useProducts()
  const [filter, setFilter] = useState("");
  const { startSearching } = useLocation().state ?? false;
  const [searching, setSearching] = useState(startSearching);

  const [selectedColorFilter, setSelectedColorFilter] = useState<string[]>([]);

  const availableColors = useMemo(() => {
    const colorSet = new Set<string>();
    products.forEach(p => 
        p.variants.forEach(v => colorSet.add(v.color))
    );
    return Array.from(colorSet);
}, [products]);

  const filteredProducts = products
    // ZMIANA TUTAJ: Poprawiona logika filtrowania kolorów
    .filter((p: Product) => {
      // Jeśli nie wybrano filtrów kolorów, zwróć produkt (true)
      if (selectedColorFilter.length === 0) {
        return true;
      }
      // W przeciwnym razie sprawdź, czy tablica kolorów produktu
      // zawiera chociaż jeden z kolorów wybranych w filtrze.
      return p.variants.some(variant => selectedColorFilter.includes(variant.color));
    })
    // 2. Filtruj po tekście z paska wyszukiwania (bez zmian)
    .filter((p: Product) => {
      if (filter === '') return true;
      const lowerCaseFilter = filter.toLowerCase();
      const nameMatch = p.name.toLowerCase().includes(lowerCaseFilter);
      const priceMatch = p.variants.some(variant => variant.unitPrice.toString().includes(lowerCaseFilter));

      return nameMatch || priceMatch;
    });

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
      <NavBar searching={searching} onSearch={(value: string) => setFilter(value)} setSearching={(value: boolean) => setSearching(value)} showFilterButton={true} selectedColorFilter={selectedColorFilter} setSelectedColorFilter={setSelectedColorFilter} availableColors={availableColors}/>
      <div className="products">
        {filteredProducts.map((p, index) => {
          const initialColorForCard = selectedColorFilter.find(filterColor => 
            p.variants.some(variant => variant.color === filterColor)
          );

          return (
            <ProductCard product={p} key={index+1} startColor={initialColorForCard} />
          )
        }
        )}
        {filteredProducts.length === 0 && <p>Brak produktów spełniających kryteria.</p>}
      </div>
    </div>
  )
}

export default Store;