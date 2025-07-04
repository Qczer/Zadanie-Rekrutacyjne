import type { Product } from '../../models/Product';
import './index.css'

import tShirt from '@productsAssets/t-shirt.png';

type Props = {
  product: Product;
}

const ProductCard = ({ product }: Props) => {
  return (
    <div key={product.id} className="productCard">
      <img src={tShirt} alt={product.name} height={150}/>
      <p style={{fontSize: 24, fontWeight: 'bold'}}>{product.name}</p>
      <p>{product.price}zł</p>
      <button>Add To Cart</button>
    </div>
  )
};

export default ProductCard;