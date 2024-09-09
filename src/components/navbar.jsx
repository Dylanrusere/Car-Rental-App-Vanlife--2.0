import React, { useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { CartPopup } from './pages/CartPopup'; // Import the CartPopup component
import './navbar.css';

export const Navbar = ({ cart, removeFromCart }) => {
  const [menuVisible, setMenuVisible] = useState(false);
  const [cartVisible, setCartVisible] = useState(false);
  const location = useLocation();

  const hideNavLinks = location.pathname === "/profile" || location.pathname === "/signup" || location.pathname === "/";

  const toggleCart = () => {
    setCartVisible(!cartVisible);
  };

  return (
    <nav>
      <Link to="/" className="titleLogo">#CarRental</Link>
      <div className="ham_menu" onClick={() => setMenuVisible(!menuVisible)}>
        <span></span>
        <span></span>
        <span></span>
      </div>
      <ul className={menuVisible ? "open" : ""}>
        {!hideNavLinks && (
          <>
            <li>
              <NavLink to="/about">About</NavLink>
            </li>
            <li>
              <NavLink to="/vans">Vans</NavLink>
            </li>
            <li>
              <button onClick={toggleCart}>
                <i className="fa-solid fa-shopping-cart"></i> ({cart.length})
              </button>
            </li>
          </>
        )}
        <li>
          <NavLink to="/profile"><i className="fa-solid fa-right-from-bracket"></i></NavLink>
        </li>
      </ul>
      {cartVisible && (
        <CartPopup
          cart={cart}
          removeFromCart={removeFromCart}
          closePopup={() => setCartVisible(false)}
        />
      )}
    </nav>
  );
};
