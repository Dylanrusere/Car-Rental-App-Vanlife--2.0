import React, { useState } from 'react';
import { Vans } from './Vans';
import { HostVans } from './HostVans';

export const ParentComponent = () => {
  const [vans, setVans] = useState([
    { id: 1, name: 'Simple Van', price: 80, type: 'Simple', img: 'url1', rented: false },
    { id: 2, name: 'Rugged Van', price: 100, type: 'Rugged', img: 'url2', rented: false },
    { id: 3, name: 'Luxury Van', price: 200, type: 'Luxury', img: 'url3', rented: false }
  ]);

  const rentVan = (vanId) => {
    setVans(vans.map(van => van.id === vanId ? { ...van, rented: true } : van));
  };

  return (
    <div>
      <Vans vans={vans} rentVan={rentVan} />
      <HostVans vans={vans} />
    </div>
  );
};