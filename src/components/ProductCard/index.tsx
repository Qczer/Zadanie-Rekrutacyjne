import type { Product } from '../../models/Product';
import './index.css'
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import LikeButton from '../Buttons/LikeButton';
import ColorButton from '../Buttons/ColorButton';
import SizeButton from '../Buttons/SizeButton';

type Props = {
  product: Product;
  startColor?: string;
}

const ProductCard = ({ product, startColor }: Props) => {
  const navigate = useNavigate();
  const [selectedColor, setSelectedColor] = useState(startColor ?? product.colors[0] ?? undefined);
  const [selectedSize, setSelectedSize] = useState(product.sizes[0] ?? undefined);
  const [likeVisible, setLikeVisible] = useState(false);

  useEffect(() => {
    if(startColor) setSelectedColor(startColor);
  }, [startColor])

  return (
    <div key={product.id} className="productCard" onClick={() => {const params = [selectedColor && `color=${selectedColor}`,selectedSize && `size=${selectedSize}`].filter(Boolean).join('&');
    navigate(`/product/${product.id}${params ? '?'+params : ''}`)}} onMouseEnter={() => setLikeVisible(true)} onMouseLeave={() => setLikeVisible(false)}>
      <LikeButton product={product} visible={likeVisible}/>
      <img src={`/${product.imageUrl}${selectedColor ? '_'+selectedColor.toLowerCase() : ''}.png`} alt={product.name} height={150}/>
      <p className='name'>{product.name}</p>
      <p className='price'>{product.price}zł</p>
      <div className='colors'>
        {product.colors.map((color, index) => {
          return <ColorButton color={color} active={selectedColor === color} key={index+1} onClick={(value) => setSelectedColor(value)}/>}
        )}
      </div>
      <div className='sizes-scroll-container'>
        <div className='sizes-flex-group'>
          {product.sizes.map((size, index) => {
            return <SizeButton size={size} active={selectedSize === size} key={index+1} onClick={(value) => setSelectedSize(value)} width={35}/>
          })}
        </div>
      </div>
    </div>
  )
};

export default ProductCard;