import { useCartProducts } from '../../contexts/Cart';
import type Product from '../../models/Product';
import './index.css'
import LikeButton from '../LikeButton';

type Props = {
  product: Product;
}

const ProductCard = ({ product }: Props) => {
  const { addToCart } = useCartProducts()

  return (
    <div key={product.id} className="productCard">
      <LikeButton product={product}/>
      <img src={`/assets/products/${product.name.toLowerCase()}.png`} alt={product.name} height={150}/>
      <p className='name'>{product.name}</p>
      <p className='price'>{product.price}zł</p>
      <button className="addToCartBtn" onClick={() => addToCart(product)}>Add To Cart</button>
    </div>
  )
};

export default ProductCard;