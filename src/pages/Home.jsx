import React, { useEffect, useState } from 'react';
import axiosInstance from '../api/axiosInstance';
import PropertyCard from '../components/PropertyCard';
import { Link } from 'react-router';

const Home = () => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const response = await axiosInstance.get('/properties?page=1&limit=10');
        setProperties(response.data.properties);
      } catch (err) {
        setError('Failed to load properties');
      } finally {
        setLoading(false);
      }
    };

    fetchProperties();
  }, []);

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen bg-gray-50 text-gray-500 text-xl animate-pulse">
        Loading properties...
      </div>
    );

  if (error)
    return (
      <div className="flex justify-center items-center h-screen bg-gray-50 text-red-600 text-lg font-semibold">
        {error}
      </div>
    );





  return (
    <main className="min-h-screen bg-gradient-to-br from-white to-slate-100 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <header className="mb-10 text-center">
          <h1 className="text-4xl font-bold text-gray-800 mb-2 tracking-tight">Find Your Next Stay</h1>
          <p className="text-gray-500 text-lg">Browse through a curated list of top properties</p>
        </header>

        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {properties.map((prop) => (
            // <Link  to={`/properties/${property.id}`}>
            <Link to={`/properties/${prop.id}`}>

            <div
              key={prop.id}
              className="transform transition duration-300 hover:scale-[1.02] hover:shadow-xl"
            >
              <PropertyCard property={prop} />
            </div>
             </Link>
          ))}
        </section>
      </div>
    </main>
  );
};

export default Home;
