import NavBar from '../../components/NavBar';
import { useProducts } from '../../contexts/Products';
import './index.css'
import { useParams } from 'react-router-dom';

const Product = () => {
  const { id } = useParams();
  const { products } = useProducts();
  
  const product = products?.find(p => p.id === Number(id));

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
          <img src={`/assets/products/${product.name.toLowerCase()}.png`} alt={product.name} height={300}/>
        </div>
        <div className="productLayoutInfo">
          <h1>{product.name}</h1>
          <span>{product.price}</span>
        </div>
      </div>
    </div>
  );
}

export default Product;