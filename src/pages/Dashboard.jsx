import React, { useState, useEffect } from 'react';
import axiosInstance from '../api/axiosInstance';
import { Link } from 'react-router-dom';
import { FaCalendarAlt, FaHome } from 'react-icons/fa';

const Dashboard = () => {
  const [bookings, setBookings] = useState([]);
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [bRes, pRes] = await Promise.all([
          axiosInstance.get('/bookings'),
          axiosInstance.get('/properties/me')
        ]);
        setBookings(bRes.data);
        setProperties(pRes.data);
      } catch (error) {
        console.error('Failed to load dashboard data', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) return <p className="text-center mt-20 text-xl">Loading dashboard...</p>;

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-8">
      <h2 className="text-3xl font-extrabold text-gray-800 border-b pb-2">Dashboard</h2>

      {/* Bookings Section */}
      <section className="bg-white rounded-lg shadow-lg p-6">
        <div className="flex items-center mb-4">
          <FaCalendarAlt className="text-2xl text-blue-600 mr-2" />
          <h3 className="text-2xl font-semibold">My Upcoming Bookings</h3>
        </div>
        {bookings.length === 0 ? (
          <p className="text-gray-600">You have no upcoming bookings.</p>
        ) : (
          <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {bookings.map((b) => (
              <Link
                to={`/manage-booking/${b.id}`}
                key={b.id}
                className="block transform hover:scale-105 transition-transform"
              >
                <div className="border rounded-lg overflow-hidden">
                  <img
                    src={b.property.images[0]}
                    alt={b.property.title}
                    className="w-full h-40 object-cover"
                  />
                  <div className="p-4 bg-gray-50">
                    <h4 className="font-bold text-lg text-gray-800 mb-1">{b.property.title}</h4>
                    <p className="text-gray-600 text-sm mb-2">{b.property.location}</p>
                    <p className="text-gray-700 font-medium">
                      {new Date(b.startDate).toLocaleDateString()} - {new Date(b.endDate).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>

      {/* Properties Section */}
      <section className="bg-white rounded-lg shadow-lg p-6">
        <div className="flex items-center mb-4">
          <FaHome className="text-2xl text-green-600 mr-2" />
          <h3 className="text-2xl font-semibold">My Properties</h3>
        </div>
        {properties.length === 0 ? (
          <p className="text-gray-600">You have not listed any properties yet.</p>
        ) : (
          <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {properties.map((p) => (
              <Link
                to={`/properties/${p.id}`}
                key={p.id}
                className="block transform hover:scale-105 transition-transform"
              >
                <div className="border rounded-lg overflow-hidden">
                  <img
                    src={p.images[0]}
                    alt={p.title}
                    className="w-full h-40 object-cover"
                  />
                  <div className="p-4 bg-gray-50">
                    <h4 className="font-bold text-lg text-gray-800 mb-1">{p.title}</h4>
                    <p className="text-gray-600 text-sm mb-2">{p.location}</p>
                    <p className="text-gray-700 font-medium">${p.price} / night</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default Dashboard;
