import './index.css';
import NavBar from "../../components/NavBar";
import { useCartProducts } from '../../contexts/Cart';
import AxiosInstance from '../../api/AxiosInstance';
import { useState } from 'react';

const Cart = () => {
  const {
    cartProducts,
    addToCart,
    decreaseFromCart,
    removeFromCart,
    clearCart
  } = useCartProducts();
  const [message, setMessage] = useState('')

  function orderCart() {
    const orderData = cartProducts.map(item => ({
      productId: item.product.id,
      quantity: item.amount
    }));

    console.log(orderData)

    AxiosInstance.post('/orders', orderData)
    .then(() => {
      setMessage('Your order was completed successfully.')
      clearCart();
    })
    .catch(error => {
      console.error('An error occurred while processing your order:', error.response?.data ?? error.message);
      setMessage('An error occurred while processing your order')
    });
  }

  return (
    <div className="cart-container">
      <NavBar />
      <div className="cart-content">
        <div style={{position: 'relative'}}>
          <h1 className="cart-title">Your Cart</h1>
          <button onClick={clearCart} className="btn clear-btn">Clear Cart</button>
        </div>
        {cartProducts.length === 0 ? (
          <p className="cart-empty">Your cart is empty.</p>
        ) : (
          <div>
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
            <button onClick={orderCart} className="btn order-btn">Order</button>
          </div>
        )}
        {message && <h2>{message}</h2>}
      </div>
    </div>
  );
};

export default Cart;
