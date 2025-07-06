import './index.css';
import NavBar from "../../components/NavBar";
import { useCartProducts } from '../../contexts/Cart';

const Cart = () => {
  const {
    cartProducts,
    addToCart,
    decreaseFromCart,
    removeFromCart,
    clearCart
  } = useCartProducts();

  return (
    <div className="cart-container">
      <NavBar />
      <div className="cart-content">
        <h1 className="cart-title">Twój koszyk</h1>

        {cartProducts.length === 0 ? (
          <p className="cart-empty">Koszyk jest pusty.</p>
        ) : (
          <>
            {cartProducts.map((p, index) => (
              <div key={index+1} className="cart-item">
                <div className="item-info">
                  <img src={`/assets/products/${p.product.name.toLowerCase()}.png`} alt={p.product.name} height={150}/>
                  <p className="item-name">{p.product.name}</p>
                </div>
                <div className="item-controls">
                  <button onClick={() => decreaseFromCart(p.product)} className="btn control-btn">−</button>
                  <span className="item-amount">{p.amount}</span>
                  <button onClick={() => addToCart(p.product)} className="btn control-btn">+</button>
                  <button onClick={() => removeFromCart(p.product)} className="btn delete-btn">🗑️</button>
                </div>
              </div>
            ))}

            <button onClick={clearCart} className="btn clear-btn">
              Wyczyść koszyk
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default Cart;
