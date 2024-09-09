import "./App.css";
import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import { Navbar } from "./components/navbar";
import { About, Home, Vans, Signup, Profile, Vandetails } from "./components/pages";
import { HostDashboard } from "./components/pages/Host/HostDashboard";
import { HostVans } from "./components/pages/Host/HostVans";
import { HostReviews } from "./components/pages/Host/HostReviews";
import { HostIncome } from "./components/pages/Host/HostIncome";
import { HostVansDetails } from "./components/pages/Host/HostVansDetails";
import img1 from './images/image-53.png'

function App() {
  // Centralized van data and cart state
  const [vans, setVans] = useState([
    { id: 1, type: "Simple", price: 60, img: img1, name: "Modest Explorer", rented: false },
    { id: 2, type: "Rugged", price: 80, img: img1, name: "Beach Bum", rented: false },
    { id: 3, type: "Luxury", price: 100, img: img1, name: "Reliable Red", rented: false },
    // More vans...
  ]);

  const [cart, setCart] = useState([]);

  // Function to mark a van as rented and update cart
  const rentVan = (vanId) => {
    const updatedVans = vans.map(van => van.id === vanId ? { ...van, rented: true } : van);
    const rentedVan = updatedVans.find(van => van.id === vanId);
    setCart([...cart, rentedVan]);
    setVans(updatedVans);
  };

  // Function to remove an item from the cart and make it available for rent again
  const removeFromCart = (vanId) => {
    const updatedCart = cart.filter(item => item.id !== vanId);
    const updatedVans = vans.map(van => van.id === vanId ? { ...van, rented: false } : van);
    setCart(updatedCart);
    setVans(updatedVans);
  };

  return (
    <div className="App">
      <Navbar cart={cart} removeFromCart={removeFromCart} />
      <Routes>
        <Route path="/" element={<Profile />} />
        <Route path="/home" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/vans" element={<Vans vans={vans} rentVan={rentVan} cart={cart} />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/vandetails" element={<Vandetails />} />
        <Route path="/hostdashboard" element={<HostDashboard />} />
        <Route path="/hostvans" element={<HostVans vans={vans} />} />
        <Route path="/hostvansdetails" element={<HostVansDetails />} />
        <Route path="/hostreviews" element={<HostReviews />} />
        <Route path="/hostincome" element={<HostIncome />} />
      </Routes>
    </div>
  );
}

export default App;
