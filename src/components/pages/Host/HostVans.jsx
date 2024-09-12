import React from 'react';
import "./HostDashboard.css"
import { Link } from 'react-router-dom';
import { HostNavbar } from './HostNavbar';

export const HostVans = ({ vans }) => {
  return (
    <div className="host-vans">
      <HostNavbar />
      <div className="vans_container">
        <h1>Your listed vans</h1>
        <div className="vans-list">
          {vans.map(van => (
            <Link to={`/hostvans/${van.id}`} key={van.id} className="van-item">
              <img src={van.img} alt={van.name} />
              <div>
                <h2>{van.name}</h2>
                <p>${van.price}/day</p>
                <p>{van.rented ? "Rented" : "Available"}</p> {/* Updated status */}
              </div>
            </Link>
          ))}
        </div>
      </div>
      <footer className='host_footer'>© 2024 #VANLIFE</footer>
    </div>
  );
};

