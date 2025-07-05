import type { Product } from '../../models/Product';
import './index.css'

type Props = {
  product: Product;
}

const ProductCard = ({ product }: Props) => {
  return (
    <div key={product.id} className="productCard">
      <img src={`/assets/products/${product.name.toLowerCase()}.png`} alt={product.name} height={150}/>
      <p className='name'>{product.name}</p>
      <p className='price'>{product.price}zł</p>
      <button>Add To Cart</button>
    </div>
  )
};

export default ProductCard;