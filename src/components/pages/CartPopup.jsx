import React from 'react';
import './CartPopup.css';

export const CartPopup = ({ cart, removeFromCart, closePopup }) => {
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
