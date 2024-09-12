import React, { useState } from 'react';
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { auth } from './pages/firebase'; // Correct file name and path
import { CartPopup } from './pages/CartPopup';
import './navbar.css';

export const Navbar = ({ cart, removeFromCart }) => {
  const [menuVisible, setMenuVisible] = useState(false);
  const [cartVisible, setCartVisible] = useState(false);
  const location = useLocation();
  const navigate = useNavigate(); // Use useNavigate instead of useHistory

  const hideNavLinks = location.pathname === "/profile" || location.pathname === "/signup" || location.pathname === "/";

  const toggleCart = () => {
    setCartVisible(!cartVisible);
  };

  const handleLogout = async () => {
  try {
    // Clear session storage and local storage
    sessionStorage.clear();
    localStorage.clear();

    // Sign out the user
    await signOut(auth);

    // Navigate to the home page or login page
    navigate('/', { replace: true }); // Use replace to avoid going back
  } catch (error) {
    console.error("Error logging out: ", error);
  }
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
          <button onClick={handleLogout} className="logout-btn">
            <i className="fa-solid fa-right-from-bracket"></i>
          </button>
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
