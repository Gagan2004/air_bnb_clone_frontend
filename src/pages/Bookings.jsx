import React, { useEffect, useState } from 'react';
import axiosInstance from '../api/axiosInstance'; // Adjust the path accordingly

const Bookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const res = await axiosInstance.get('/bookings');
        const today = new Date();

        const upcoming = res.data.filter(val => new Date(val.endDate) >= today);
        setBookings(upcoming);
      } catch (err) {
        console.error(err);
        setError('Failed to load bookings.');
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, []);

  if (loading) return <div className="text-center py-8 text-gray-500 animate-pulse">Loading...</div>;
  if (error) return <div className="text-center text-red-500">{error}</div>;
  if (bookings.length === 0) return <div className="text-center text-gray-500">No upcoming bookings.</div>;

  return (
    <section className="max-w-6xl mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold text-gray-800 mb-6 border-b pb-2">Upcoming Bookings</h2>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {bookings.map((val) => {
          const { id, startDate, endDate, property } = val;
          const imageUrl = property?.images?.[0] || 'https://via.placeholder.com/400x300?text=No+Image';

          return (
            <div
              key={id}
              className="bg-white rounded-2xl overflow-hidden shadow-md border border-gray-200 transition duration-300 hover:shadow-xl"
            >
              <img
                src={imageUrl}
                alt={property?.title || 'Property'}
                className="h-48 w-full object-cover"
              />

              <div className="p-4">
                <div className="text-sm text-gray-500 uppercase mb-1">Property</div>
                <div className="text-lg font-semibold text-gray-700 mb-3">
                  {property?.title || 'Untitled Property'}
                </div>

                <div className="text-sm text-gray-600">
                  <span className="font-medium">Start:</span>{' '}
                  {new Date(startDate).toLocaleDateString()}
                </div>
                <div className="text-sm text-gray-600">
                  <span className="font-medium">End:</span>{' '}
                  {new Date(endDate).toLocaleDateString()}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default Bookings;
