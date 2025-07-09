import { useState } from 'react';
import ColorButton from '../../components/Buttons/ColorButton';
import NavBar from '../../components/NavBar';
import { useProducts } from '../../contexts/Products';
import './index.css'
import { useParams, useSearchParams } from 'react-router-dom';
import SizeButton from '../../components/Buttons/SizeButton';
import { useCartProducts } from '../../contexts/Cart';

const Product = () => {
  const [searchParams] = useSearchParams();
  const { id } = useParams();
  const { products } = useProducts();
  const { addToCart } = useCartProducts();
  
  const product = products?.find(p => p.id === Number(id));
  const [selectedColor, setSelectedColor] = useState(searchParams.get('color') ?? product?.colors[0] ?? '');
  const [selectedSize, setSelectedSize] = useState(searchParams.get('size') ?? product?.sizes[0] ?? '');
  

  if(!product) {
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
          <img src={`/${product.imageUrl}${selectedColor ? '_'+selectedColor.toLowerCase() : ''}.png`} alt={product.name} height={300}/>
        </div>
        <div className="productLayoutInfo">
          <h1>{product.name}</h1>
          <span>{product.price}</span>
          {product.colors.length > 1 &&
            <div className="productLayoutColors">
              {product.colors.map((color, index) => {
                return <ColorButton color={color} active={selectedColor === color} key={index+1} onClick={(value) => setSelectedColor(value)}/>}
              )}
            </div>
          }
          {product.sizes &&
            <div className="productLayoutSizes">
              {product.sizes.map((size, index) => {
                return <SizeButton size={size} active={selectedSize === size} key={index+1} onClick={(value) => setSelectedSize(value)}/>}
              )}
            </div>
          }
          <button className="addToCartBtn" onClick={(e) => {e.stopPropagation(); addToCart(product, selectedColor, selectedSize)}}>Add To Cart</button>
        </div>
      </div>
    </div>
  );
}

export default Product;