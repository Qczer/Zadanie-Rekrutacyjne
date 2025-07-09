import { useCartProducts } from '../../contexts/Cart';
import type { Product } from '../../models/Product';
import './index.css'
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import LikeButton from '../Buttons/LikeButton';
import ColorButton from '../Buttons/ColorButton';

type Props = {
  product: Product;
}

const ProductCard = ({ product }: Props) => {
  const navigate = useNavigate();
  const { addToCart } = useCartProducts()
  const [selectedColor, setSelectedColor] = useState(product.colors[0]);

  return (
    <div key={product.id} className="productCard" onClick={() => navigate(`/product/${product.id}`)}>
      <LikeButton product={product}/>
      <img src={`${product.imageUrl}_${selectedColor.toLowerCase()}.png`} alt={product.name} height={150}/>
      <p className='name'>{product.name}</p>
      <p className='price'>{product.price}zł</p>
      <div className='colors'>
        {product.colors.map((color, index) => {
          return <ColorButton color={color} key={index+1} onClick={(value) => setSelectedColor(value)}/>}
        )}
      </div>
      <button className="addToCartBtn" onClick={(e) => {e.stopPropagation(); addToCart(product)}}>Add To Cart</button>
    </div>
  )
};

export default ProductCard;