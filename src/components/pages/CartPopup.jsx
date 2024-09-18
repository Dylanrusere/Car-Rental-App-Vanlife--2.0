import React, { useState, useEffect } from 'react';
import './CartPopup.css';

export const CartPopup = ({ removeFromCart, closePopup }) => {
  const [cart, setCart] = useState([]);

  // Load cart from local storage on component mount
  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      try {
        const parsedCart = JSON.parse(savedCart);
        setCart(parsedCart);
        console.log('Parsed:', parsedCart);
      } catch (error) {
        console.error("Error parsing saved cart:", error);
        setCart([]); // Reset cart if parsing fails
      }
    }
  }, []);

  // Save cart to local storage whenever it changes
  useEffect(() => {
    if (cart.length > 0) {
      localStorage.setItem('cart', JSON.stringify(cart));
    } else {
      localStorage.removeItem('cart'); // Clear storage if cart is empty
    }
  }, [cart]);

  return (
    <div className="cart-popup">
      <div className="cart-popup-content">
        <button className="close-button" onClick={closePopup}>X</button>
        <h2>Your Cart</h2>
        {cart.length === 0 ? (
          <p>Your cart is empty</p>
        ) : (
          <ul className='cart_list'>
            {cart.map((item, index) => (
              <li key={index} className="cart-item">
                <img src={item.img} alt={item.name} className="cart-item-image" />
                <div className="cart-item-details">
                  <p className="cart-item-name">{item.name}</p>
                  <p className="cart-item-price">${item.price}</p>
                </div>
                <button className="remove-button" onClick={() => removeFromCart(item.id)}>Remove</button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};
