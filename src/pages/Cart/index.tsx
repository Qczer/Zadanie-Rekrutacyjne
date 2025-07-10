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
    const orderData = {
      items: cartProducts.map(item => ({
        productVariantId: item.variant.id, // Use the variant's ID
        quantity: item.amount
      }))
    };

    console.log(orderData)

    AxiosInstance.post('/orders', orderData)
    .then(() => {
      setMessage('Your order was completed successfully.')
      clearCart();
    })
    .catch(error => {
      const errorMessage = error.response?.data?.title || error.response?.data || 'An error occurred while processing your order';
      console.error('An error occurred while processing your order:', errorMessage);
      setMessage(errorMessage);
    });
  }

  const [likeVisible, setLikeVisible] = useState<[string, boolean]>(['', false]);

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
            {cartProducts.map((item, index) => (
              <div key={index+1} className="cart-item">
                <div className="item-info" onClick={() => navigate(`/product/${item.product.id}?variant=${item.variant.id}`)}>
                  <div className="item-image" onMouseEnter={() => setLikeVisible([item.id, true])} onMouseLeave={() => setLikeVisible(['', false])}>
                    <LikeButton product={item.product} top={-10} visible={item.id == likeVisible[0] && likeVisible[1]}/>
                    <img src={`${item.product.imageUrl}${item.variant.color ? '_'+item.variant.color.toLowerCase() : ''}.png`} alt={item.product.name} height={150}/>
                  </div>
                  <div className="item-properties">
                    <p className="item-name">{item.product.name}</p>
                    <p style={{color: 'hsl(0, 0%, 90%)'}}>{item.variant.unitPrice}</p>
                    <p style={{color: 'hsl(0, 0%, 70%)'}}>{item.variant.size}</p>
                    <p style={{color: 'hsl(0, 0%, 70%)'}}>{item.variant.color}</p>
                  </div>
                </div>
                <div className="item-controls">
                  <button onClick={() => decreaseFromCart(item.id)} className="btn control-btn">−</button>
                  <input type='number' className="item-amount" value={item.amount} onChange={(e) => {if(e.target.value !== '') setProductAmount(item.id, +e.target.value)}}></input>
                  <button onClick={() => addToCart(item.product, item.variant)} className="btn control-btn">+</button>
                  <button onClick={() => removeFromCart(item.id)} className="btn delete-btn"><img src="assets/trash.svg" alt="trash" width={25}/></button>
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
