import React, { useEffect, useState } from 'react';
import axiosInstance from '../api/axiosInstance';
import PropertyCard from '../components/PropertyCard';

const Wishlist = () => {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const res = await axiosInstance.get('/wishlist');
        setFavorites(res.data);
      } catch (err) {
        console.error('Failed to load wishlist:', err);
        setError('Could not load wishlist');
      } finally {
        setLoading(false);
      }
    };
    fetchFavorites();
  }, []);

  const toggleFavorite = async (propertyId) => {
    try {
      await axiosInstance.post(`/wishlist/${propertyId}`);
      setFavorites((prev) => prev.filter(fav => fav.property.id !== propertyId));
    } catch (err) {
      console.error('Failed to remove from wishlist:', err);
      alert('Could not update wishlist.');
    }
  };

  if (loading) return <p className="p-4 text-center">Loading wishlist...</p>;
  if (error) return <p className="p-4 text-center text-red-500">{error}</p>;

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-semibold mb-4">My Wishlist</h2>
      {favorites.length === 0 ? (
        <p className="text-gray-600">Your wishlist is empty.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {favorites.map((fav) => (
            <div key={fav.id} className="relative">
              <PropertyCard property={fav.property} />
              <button
                onClick={() => toggleFavorite(fav.property.id)}
                className="absolute top-2 right-2 bg-white p-1 rounded-full shadow hover:bg-gray-100"
              >
                <span className="text-red-500 text-lg">&times;</span>
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Wishlist;
