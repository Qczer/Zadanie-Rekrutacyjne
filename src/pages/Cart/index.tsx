import './index.css';
import NavBar from "../../components/NavBar";
import { useCartProducts } from '../../contexts/Cart';
import AxiosInstance from '../../api/AxiosInstance';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import LikeButton from '../../components/Buttons/LikeButton';

const Cart = () => {
  const navigate = useNavigate();
  const {
    cartProducts,
    addToCart,
    setProductAmount,
    decreaseFromCart,
    removeFromCart,
    clearCart
  } = useCartProducts();
  const [message, setMessage] = useState('')

  function orderCart() {
    const orderData = cartProducts.map(item => ({
      productId: item.id,
      quantity: item.amount
    }));

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

  const [likeVisible, setLikeVisible] = useState<[number, boolean]>([-1, false]);

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
                <div className="item-info" onClick={() => {const params = [p.color && `color=${p.color}`,p.size && `size=${p.size}`].filter(Boolean).join('&'); navigate(`/product/${p.product.id}${params ? '?'+params : ''}`)}}>
                  <div className="item-image" onMouseEnter={() => setLikeVisible([index, true])} onMouseLeave={() => setLikeVisible([-1, false])}>
                    <LikeButton product={p.product} top={-10} visible={index == likeVisible[0] && likeVisible[1]}/>
                    <img src={`${p.product.imageUrl}${p.color ? '_'+p.color.toLowerCase() : ''}.png`} alt={p.product.name} height={150}/>
                  </div>
                  <div className="item-properties">
                    <p className="item-name">{p.product.name}</p>
                    <p style={{color: 'hsl(0, 0%, 90%)'}}>{p.product.price}</p>
                    <p style={{color: 'hsl(0, 0%, 70%)'}}>{p.size}</p>
                    <p style={{color: 'hsl(0, 0%, 70%)'}}>{p.color}</p>
                  </div>
                </div>
                <div className="item-controls">
                  <button onClick={() => decreaseFromCart(p.id)} className="btn control-btn">−</button>
                  <input type='number' className="item-amount" value={p.amount} onChange={(e) => {if(e.target.value !== '') setProductAmount(p.id, +e.target.value)}}></input>
                  <button onClick={() => addToCart(p.product, p.color, p.size)} className="btn control-btn">+</button>
                  <button onClick={() => removeFromCart(p.id)} className="btn delete-btn"><img src="assets/trash.svg" alt="delete"/></button>
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
