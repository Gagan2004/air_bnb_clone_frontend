import React from 'react';
import { Link } from 'react-router-dom';




const PropertyCard = ({ property }) => {


  const rando = Math.floor(Math.random() * 2) 

  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow">

      <img
        src={property.images[rando]}
        alt={property.title}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <h2 className="text-xl font-semibold mb-2">{property.title}</h2>
        <p className="text-gray-600 mb-4">{property.location}</p>
        <p className="text-gray-800 font-bold mb-4">${property.price}/night</p>
        <Link
          to={`/properties/${property.id}`}
          className="text-blue-600 hover:underline"
        >
          View Details
        </Link>
      </div>
    </div>
  );
};

export default PropertyCard;
