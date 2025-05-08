// src/pages/ManageBooking.jsx
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axiosInstance from '../api/axiosInstance';

const statusStyles = {
  confirmed: 'bg-green-100 text-green-700',
  completed: 'bg-blue-100 text-blue-700',
  cancelled: 'bg-red-100 text-red-700',
  pending: 'bg-yellow-100 text-yellow-700'
};

const ManageBooking = () => {
  const { bookingId } = useParams();
  const [booking, setBooking] = useState(null);
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState('');

  useEffect(() => {
    const fetchBooking = async () => {
      try {
        const response = await axiosInstance.get(`/bookings/${bookingId}`);
        setBooking(response.data);
        setStatus(response.data.status);
      } catch (error) {
        console.error('Failed to fetch booking', error);
      } finally {
        setLoading(false);
      }
    };
    fetchBooking();
  }, [bookingId]);

  const updateStatus = async (newStatus) => {
    try {
      await axiosInstance.patch(`/bookings/${bookingId}`, { status: newStatus });
      setStatus(newStatus);
    } catch (error) {
      console.error('Failed to update status', error);
    }
  };


  const deleteBooking= async ()=>{

    try{
    await axiosInstance.delete(`/bookings/${bookingId}`);
    setStatus("Cancelled");}
    catch (error) {
        console.error('Failed to delete', error);
      }


  }

  if (loading) return <p className="text-center mt-10">Loading booking details...</p>;
  if (!booking) return <p className="text-center mt-10">Booking not found.</p>;

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-xl shadow-md mt-10 space-y-4">
      <h2 className="text-3xl font-bold text-gray-800 mb-6">Manage Booking</h2>
      
      <div className="space-y-2 text-gray-700">
        <p><strong className="text-gray-600">Property:</strong> {booking.property.title}</p>
        <p><strong className="text-gray-600">Guest:</strong> {booking.user.name}</p>
        <p>
          <strong className="text-gray-600">Dates:</strong>{' '}
          {new Date(booking.startDate).toLocaleDateString()} -{' '}
          {new Date(booking.endDate).toLocaleDateString()}
        </p>
        <p>
          <strong className="text-gray-600">Status:</strong>{' '}
          <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${statusStyles[status] || 'bg-gray-100 text-gray-700'}`}>
            {status}
          </span>
        </p>
      </div>

      <div className="mt-6 flex flex-wrap gap-3">
        <button
          onClick={() => updateStatus('confirmed')}
          className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg transition"
        >
          Confirm
        </button>
        <button
          onClick={() => updateStatus('completed')}
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition"
        >
          Mark Completed
        </button>
        <button
        //   onClick={() => updateStatus('cancelled')}
          onClick={()=> deleteBooking()}
          className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default ManageBooking;
