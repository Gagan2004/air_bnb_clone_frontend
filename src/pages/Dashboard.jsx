import React, { useState, useEffect } from 'react';
import axiosInstance from '../api/axiosInstance';
import { Link } from 'react-router-dom';
import { FaCalendarAlt, FaHome } from 'react-icons/fa';

const Dashboard = () => {
  const [bookings, setBookings] = useState([]);
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const [bookingsRes, propertiesRes] = await Promise.all([
          axiosInstance.get('/bookings'),
          axiosInstance.get('/properties/me'),
        ]);
        setBookings(bookingsRes.data);
        setProperties(propertiesRes.data);
      } catch (error) {
        console.error('Error loading dashboard data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  if (loading) return <p className="text-center mt-20 text-xl">Loading your dashboard...</p>;

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-12">
      <h2 className="text-3xl font-extrabold text-gray-900 border-b pb-2">Dashboard</h2>

      <BookingSection bookings={bookings} />
      <PropertySection properties={properties} />
    </div>
  );
};

const BookingSection = ({ bookings }) => (
  <section className="bg-white rounded-lg shadow-md p-6">
    <div className="flex items-center mb-4">
      <FaCalendarAlt className="text-2xl text-blue-600 mr-2" />
      <h3 className="text-2xl font-semibold">My Upcoming Bookings</h3>
    </div>

    {bookings.length === 0 ? (
      <p className="text-gray-600">You have no upcoming bookings.</p>
    ) : (
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {bookings.map((booking) => (
          <Link
            key={booking.id}
            to={`/manage-booking/${booking.id}`}
            className="transform hover:scale-105 transition-transform"
          >
            <div className="border rounded-lg overflow-hidden bg-gray-50">
              <img
                src={booking.property?.images[0] || '/placeholder.jpg'}
                alt={booking.property?.title || 'Property'}
                className="w-full h-40 object-cover"
              />
              <div className="p-4">
                <h4 className="font-bold text-lg text-gray-800">{booking.property?.title}</h4>
                <p className="text-sm text-gray-600 mb-1">{booking.property?.location}</p>
                <p className="text-gray-700 font-medium">
                  {formatDate(booking.startDate)} – {formatDate(booking.endDate)}
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    )}
  </section>
);

const PropertySection = ({ properties }) => (
  <section className="bg-white rounded-lg shadow-md p-6">
    <div className="flex items-center mb-4">
      <FaHome className="text-2xl text-green-600 mr-2" />
      <h3 className="text-2xl font-semibold">My Properties</h3>
    </div>

    {properties.length === 0 ? (
      <p className="text-gray-600">You have not listed any properties yet.</p>
    ) : (
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {properties.map((property) => (
          <Link
            key={property.id}
            to={`/properties/${property.id}`}
            className="transform hover:scale-105 transition-transform"
          >
            <div className="border rounded-lg overflow-hidden bg-gray-50">
              <img
                src={property.images[0] || '/placeholder.jpg'}
                alt={property.title}
                className="w-full h-40 object-cover"
              />
              <div className="p-4">
                <h4 className="font-bold text-lg text-gray-800">{property.title}</h4>
                <p className="text-sm text-gray-600 mb-1">{property.location}</p>
                <p className="text-gray-700 font-medium">${property.price} / night</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    )}
  </section>
);

const formatDate = (dateStr) => {
  const date = new Date(dateStr);
  return isNaN(date.getTime()) ? 'Invalid date' : date.toLocaleDateString();
};

export default Dashboard;
