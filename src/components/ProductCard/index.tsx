import type { Product } from '../../models/Product';
import './index.css'
import { useNavigate } from 'react-router-dom';
import { useEffect, useMemo, useState } from 'react';
import LikeButton from '../Buttons/LikeButton';
import ColorButton from '../Buttons/ColorButton';
import SizeButton from '../Buttons/SizeButton';
import type { ProductVariant } from '../../models/ProductVariant';

type Props = {
  product: Product;
  startColor?: string;
}

const ProductCard = ({ product, startColor }: Props) => {
  const navigate = useNavigate();

  const availableColors = useMemo(() => [...new Set(product.variants.map(v => v.color))], [product.variants]);
  const [selectedColor, setSelectedColor] = useState(startColor ?? availableColors[0]);
  const [likeVisible, setLikeVisible] = useState(false);

  const sizesForSelectedColor = useMemo(() => 
    product.variants
      .filter(v => v.color === selectedColor)
      .map(v => v.size), 
    [product.variants, selectedColor]
  );

  const [selectedSize, setSelectedSize] = useState(sizesForSelectedColor[0]);

  const selectedVariant = useMemo<ProductVariant | undefined>(() => 
    product.variants.find(v => v.color === selectedColor && v.size === selectedSize),
    [product.variants, selectedColor, selectedSize]
  );

  useEffect(() => {
    if (startColor && availableColors.includes(startColor)) {
      handleColorClick(startColor);
    }
  }, [startColor]);

  const handleColorClick = (color: string) => {
    setSelectedColor(color);
    
    // Find all variants for the newly selected color
    const variantsInNewColor = product.variants.filter(v => v.color === color);
    const isCurrentSizeAvailable = variantsInNewColor.some(v => v.size === selectedSize);

    // If the current size is NOT available in the new color, THEN reset to the first available size.
    if (!isCurrentSizeAvailable) {
      setSelectedSize(variantsInNewColor[0]?.size ?? '');
    }
    // Otherwise, the selectedSize remains the same, providing a better user experience.
  };

  const handleCardClick = () => {
    if (selectedVariant) {
      // Navigate to product detail page with the variant ID
      navigate(`/product/${product.id}?variant=${selectedVariant.id}`);
    }
  };

  return (
    <div key={product.id} className="productCard" onClick={handleCardClick} onMouseEnter={() => setLikeVisible(true)} onMouseLeave={() => setLikeVisible(false)}>
      <LikeButton product={product} visible={likeVisible}/>
      <img src={`/${product.imageUrl}${selectedColor ? '_'+selectedColor.toLowerCase() : ''}.png`} alt={product.name} height={150}/>
      <p className='name'>{product.name}</p>
      <p className='price'>{selectedVariant ? `${selectedVariant.unitPrice.toFixed(2)}zł` : 'N/A'}zł</p>
      <div className='colors'>
        {availableColors.map((color, index) => (
          <ColorButton color={color} active={selectedColor === color} key={index+1} onClick={handleColorClick} />
        ))}
      </div>
      <div className='sizes-scroll-container'>
        <div className='sizes-flex-group'>
          {sizesForSelectedColor.map((size, index) => (
            <SizeButton size={size} active={selectedSize === size} key={index+1} onClick={setSelectedSize} width={35} />
          ))}
        </div>
      </div>
    </div>
  )
};

export default ProductCard;