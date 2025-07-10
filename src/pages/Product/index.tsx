import { useEffect, useMemo, useState } from 'react';
import ColorButton from '../../components/Buttons/ColorButton';
import NavBar from '../../components/NavBar';
import { useProducts } from '../../contexts/Products';
import './index.css'
import { useParams, useSearchParams } from 'react-router-dom';
import SizeButton from '../../components/Buttons/SizeButton';
import { useCartProducts } from '../../contexts/Cart';
import type { ProductVariant } from '../../models/ProductVariant';

const Product = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { id } = useParams();
  const { products } = useProducts();
  const { addToCart } = useCartProducts();
  
  const product = useMemo(() => 
    products?.find(p => p.id === Number(id)), 
    [products, id]
  );

  const initialVariant = useMemo(() => {
    if (!product) return undefined;
    const variantIdFromUrl = searchParams.get('variant');
    if (variantIdFromUrl) {
      return product.variants.find(v => v.id === Number(variantIdFromUrl));
    }
    // Fallback to the first variant if none is specified in the URL
    return product.variants[0];
  }, [product, searchParams]);

  const [selectedVariant, setSelectedVariant] = useState<ProductVariant | undefined>(initialVariant);

  useEffect(() => {
    if (selectedVariant) {
      setSearchParams({ variant: selectedVariant.id.toString() });
    }
  }, [selectedVariant, setSearchParams]);

  useEffect(() => {
    setSelectedVariant(initialVariant);
  }, [initialVariant]);

  const availableColors = useMemo(() => 
    product ? [...new Set(product.variants.map(v => v.color))] : [],
    [product]
  );

  const sizesForSelectedColor = useMemo(() => 
    product ? product.variants
      .filter(v => v.color === selectedVariant?.color)
      .map(v => v.size)
    : [],
    [product, selectedVariant]
  );

  const handleColorChange = (color: string) => {
    // Find the first variant with the new color and a size that's available
    const newVariant = product?.variants.find(v => v.color === color);
    if (newVariant) {
      setSelectedVariant(newVariant);
    }
  };

  const handleSizeChange = (size: string) => {
    // Find the variant with the currently selected color and the new size
    const newVariant = product?.variants.find(v => v.color === selectedVariant?.color && v.size === size);
    if (newVariant) {
      setSelectedVariant(newVariant);
    }
  };

  const handleAddToCart = () => {
    if (product && selectedVariant) {
      addToCart(product, selectedVariant);
    }
  };
  

  if(!product || !selectedVariant) {
    return (
      <div className="container">
        <NavBar />
        <h2>Loading product...</h2>
      </div>
    )
  }

  return (
    <div className="container">
      <NavBar />
      <div className="productLayout">
        <div className="productLayoutImage">
          <img src={`/${product.imageUrl}${selectedVariant.color ? '_'+selectedVariant.color.toLowerCase() : ''}.png`} alt={product.name} height={300}/>
        </div>
        <div className="productLayoutInfo">
          <h1>{product.name}</h1>
          {product.description && <p className="product-description">{product.description}</p>}
          <span className="product-price">{selectedVariant.unitPrice.toFixed(2)}zł</span>
          {availableColors.length > 1 &&
            <div className="productLayoutColors">
              {availableColors.map((color, index) => {
                return <ColorButton color={color} active={selectedVariant.color === color} key={index+1} onClick={() => handleColorChange(color)}/>}
              )}
            </div>
          }
          {sizesForSelectedColor.length > 0 &&
            <div className="productLayoutSizes">
              {sizesForSelectedColor.map((size, index) => {
                return <SizeButton size={size} active={selectedVariant.size === size} key={index+1} onClick={() => handleSizeChange(size)}/>}
              )}
            </div>
          }
          <button className="addToCartBtn" onClick={handleAddToCart}>Add To Cart</button>
        </div>
      </div>
    </div>
  );
}

export default Product;