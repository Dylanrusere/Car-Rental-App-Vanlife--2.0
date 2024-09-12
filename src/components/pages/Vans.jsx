import React, { useState, useEffect } from "react";
import "../pages/page.css";

export const Vans = ({ vans, rentVan }) => {
  const [filter, setFilter] = useState("All");
  const [cart, setCart] = useState([]);

  // Load cart from local storage on component mount
  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    console.log("Saved cart from localStorage:", savedCart); // Log raw data
    const parsedCart = JSON.parse(savedCart) || [];
    console.log("Parsed cart:", parsedCart); // Log parsed data
    setCart(parsedCart);
  }, []);

  // Save cart to local storage whenever cart changes
  useEffect(() => {
    console.log("Cart updated:", cart); // Log updated cart
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  const handleFilterChange = (filterType) => {
    setFilter(filterType);
  };

  const handleRent = (van) => {
    if (!van.rented) {
      // Mark the van as rented
      const updatedVans = vans.map(v => v.id === van.id ? { ...v, rented: true } : v);
      const updatedCart = [...cart, van];
      
      setCart(updatedCart);
      rentVan(van.id); // Assuming this updates the server or backend
    }
  };

  const getTabStyle = (tab) => {
    let backgroundColor;
    switch (tab) {
      case "Simple":
        backgroundColor = "#E17654";
        break;
      case "Rugged":
        backgroundColor = "#115E59";
        break;
      case "Luxury":
        backgroundColor = "#252525";
        break;
      default:
        backgroundColor = "#4D4D4D";
        break;
    }
    return {
      backgroundColor: filter === tab ? backgroundColor : "#FFEAD0",
      color: filter === tab ? "#fff" : "#000",
    };
  };

  const filteredVans = filter === "All" ? vans : vans.filter(van => van.type === filter && !van.rented);

  return (
    <div>
      <div className="overall_container">
        <p className="vans_head">Explore our van options</p>
        
        <div className="tabs">
          {["All", "Simple", "Rugged", "Luxury"].map(tab => (
            <button
              key={tab}
              className={`tab ${filter === tab ? "active" : ""}`}
              onClick={() => handleFilterChange(tab)}
              style={getTabStyle(tab)} 
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="vans_grid_container">
          {filteredVans.map(van => (
            <div key={van.id} className="van_container">
              <img className="van_img" src={van.img} alt={van.name} />
              <div className="van_details">
                <p className="van_type">{van.name}</p>
                <p className="van_price">${van.price}</p>
              </div>
              <p className="van_duration">/day</p>
              <p className={`van_type_${van.type.toLowerCase()}`}>{van.type}</p>
              <button onClick={() => handleRent(van)} disabled={van.rented}>
                {van.rented ? "Rented" : "Rent Van"}
              </button>
            </div>
          ))}
        </div>
      </div>
      
      <footer>
        &copy;2024 #VANLIFE
      </footer>
    </div>
  );
};
