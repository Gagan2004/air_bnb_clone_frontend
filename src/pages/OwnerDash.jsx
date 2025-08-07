
// import React, { useEffect, useState } from 'react';
// import axiosInstance from '../api/axiosInstance';
// import { useNavigate } from 'react-router-dom';

// const OwnerDashboard = () => {
//   const [properties, setProperties]         = useState([]);
//   const [rentalHistory, setRentalHistory]   = useState([]);
//   const [loading, setLoading]               = useState(true);
//   const navigate                             = useNavigate();

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         // fetch owner’s own properties
//         const propRes = await axiosInstance.get('/owner/properties');
//         setProperties(propRes.data.properties);

//         // fetch bookings for owner’s properties
//         const historyRes = await axiosInstance.get('/owner/rental-history');
//         setRentalHistory(historyRes.data.bookings);
//       } catch (err) {
//         console.error('Owner dashboard fetch error', err);
//         // you might redirect to login if 401
//         if (err.response?.status === 401) {
//           navigate('/login');
//         }
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, [navigate]);

//   const handleDelete = async (propId) => {
//     if (!window.confirm('Delete this property?')) return;
//     try {
//       await axiosInstance.delete(`/properties/${propId}`);
//       setProperties(props => props.filter(p => p.id !== propId));
//     } catch (err) {
//       console.error('Failed to delete property', err);
//     }
//   };

//   if (loading) return <p className="text-center mt-10">Loading owner dashboard...</p>;

//   return (
//     <div className="max-w-5xl mx-auto p-6 space-y-8">
//       <h1 className="text-3xl font-bold">Owner Dashboard</h1>

//       {/* Action Bar */}
//       <div className="flex justify-end">
//         <button
//           onClick={() => navigate('/host-property')}
//           className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded"
//         >
//           + Add New Property
//         </button>
//       </div>

//       {/* Properties Table */}
//       <section>
//         <h2 className="text-2xl font-semibold mb-4">My Properties</h2>
//         <div className="overflow-x-auto bg-white rounded shadow">
//           <table className="min-w-full divide-y divide-gray-200">
//             <thead className="bg-gray-50">
//               <tr>
//                 <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">Title</th>
//                 <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">Type</th>
//                 <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">Rent / mo</th>
//                 <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">Location</th>
//                 <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">Actions</th>
//               </tr>
//             </thead>
//             <tbody className="divide-y divide-gray-200">
//               {properties.map(p => (
//                 <tr key={p.id}>
//                   <td className="px-4 py-2 whitespace-nowrap">{p.title}</td>
//                   <td className="px-4 py-2 whitespace-nowrap capitalize">{p.type || '—'}</td>
//                   <td className="px-4 py-2 whitespace-nowrap">${p.price.toFixed(2)}</td>
//                   <td className="px-4 py-2 whitespace-nowrap">{p.location}</td>
//                   <td className="px-4 py-2 whitespace-nowrap space-x-2">
//                     <button
//                       onClick={() => navigate(`/properties/${p.id}/edit`)}
//                       className="px-2 py-1 bg-blue-500 hover:bg-blue-600 text-white rounded text-sm"
//                     >
//                       Edit
//                     </button>
//                     <button
//                       onClick={() => handleDelete(p.id)}
//                       className="px-2 py-1 bg-red-500 hover:bg-red-600 text-white rounded text-sm"
//                     >
//                       Delete
//                     </button>
//                   </td>
//                 </tr>
//               ))}
//               {properties.length === 0 && (
//                 <tr>
//                   <td colSpan="5" className="px-4 py-6 text-center text-gray-500">
//                     You have no properties yet.
//                   </td>
//                 </tr>
//               )}
//             </tbody>
//           </table>
//         </div>
//       </section>

//       {/* Rental History */}
//       <section>
//         <h2 className="text-2xl font-semibold mb-4">Rental History</h2>
//         <div className="overflow-x-auto bg-white rounded shadow">
//           <table className="min-w-full divide-y divide-gray-200">
//             <thead className="bg-gray-50">
//               <tr>
//                 <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">Property</th>
//                 <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">Renter</th>
//                 <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">From</th>
//                 <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">To</th>
//                 <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">Status</th>
//               </tr>
//             </thead>
//             <tbody className="divide-y divide-gray-200">
//               {rentalHistory.map(b => (
//                 <tr key={b.id}>
//                   <td className="px-4 py-2 whitespace-nowrap">{b.property.title}</td>
//                   <td className="px-4 py-2 whitespace-nowrap">{b.user.name}</td>
//                   <td className="px-4 py-2 whitespace-nowrap">{new Date(b.startDate).toLocaleDateString()}</td>
//                   <td className="px-4 py-2 whitespace-nowrap">{new Date(b.endDate).toLocaleDateString()}</td>
//                   <td className="px-4 py-2 whitespace-nowrap capitalize">{b.status}</td>
//                 </tr>
//               ))}
//               {rentalHistory.length === 0 && (
//                 <tr>
//                   <td colSpan="5" className="px-4 py-6 text-center text-gray-500">
//                     No rentals yet.
//                   </td>
//                 </tr>
//               )}
//             </tbody>
//           </table>
//         </div>
//       </section>
//     </div>
//   );
// };

// export default OwnerDashboard;


// src/pages/OwnerDashboard.jsx
import React, { useEffect, useState } from 'react';
import axiosInstance from '../api/axiosInstance';
import { useNavigate } from 'react-router-dom';

const OwnerDashboard = () => {
  const [properties, setProperties]       = useState([]);
  const [bookings, setBookings]           = useState([]);
  const [loading, setLoading]             = useState(true);
  const navigate                          = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        // 1) Fetch owner's properties
        const propRes = await axiosInstance.get('/owner/properties');
        setProperties(propRes.data.properties);

        // 2) Fetch bookings for those properties
        const histRes = await axiosInstance.get('/owner/rental-history');
        setBookings(histRes.data.bookings);
      } catch (err) {
        console.error('Owner dashboard fetch error', err);
        if (err.response?.status === 401) {
          navigate('/login');
        }
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [navigate]);

  // Delete a property
  const handleDeleteProperty = async (propId) => {
    if (!window.confirm('Delete this property?')) return;
    try {
      await axiosInstance.delete(`/properties/${propId}`);
      setProperties(ps => ps.filter(p => p.id !== propId));
    } catch (err) {
      console.error('Failed to delete property', err);
      alert(err.response?.data?.message || 'Delete failed');
    }
  };

  // Approve or reject a booking
  const updateBookingStatus = async (bookingId, newStatus) => {
    try {
      const res = await axiosInstance.patch(`/bookings/${bookingId}`, { status: newStatus });
      setBookings(bs =>
        bs.map(b => (b.id === bookingId ? { ...b, status: res.data.status } : b))
      );
    } catch (err) {
      console.error('Failed to update booking', err);
      alert(err.response?.data?.message || 'Status update failed');
    }
  };

  if (loading) return <p className="text-center mt-10">Loading owner dashboard…</p>;

  // Partition bookings
  const newRequests    = bookings.filter(b => b.status === 'pending');
  const pastBookings   = bookings.filter(b => b.status !== 'pending');

  return (
    <div className="max-w-5xl mx-auto p-6 space-y-8">
      <h1 className="text-3xl font-bold">Owner Dashboard</h1>

      {/* Add New Property */}
      <div className="flex justify-end">
        <button
          onClick={() => navigate('/host-property')}
          className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded"
        >
          + Add New Property
        </button>
      </div>

      {/* My Properties */}
      <section>
        <h2 className="text-2xl font-semibold mb-4">My Properties</h2>
        <div className="overflow-x-auto bg-white rounded shadow">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">Title</th>
                <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">Type</th>
                <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">Rent / mo</th>
                <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">Location</th>
                <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {properties.length === 0 && (
                <tr>
                  <td colSpan="5" className="px-4 py-6 text-center text-gray-500">
                    You have no properties yet.
                  </td>
                </tr>
              )}
              {properties.map(p => (
                <tr key={p.id}>
                  <td className="px-4 py-2 whitespace-nowrap">{p.title}</td>
                  <td className="px-4 py-2 whitespace-nowrap capitalize">{p.type || '—'}</td>
                  <td className="px-4 py-2 whitespace-nowrap">${p.price.toFixed(2)}</td>
                  <td className="px-4 py-2 whitespace-nowrap">{p.location}</td>
                  <td className="px-4 py-2 whitespace-nowrap space-x-2">
                    <button
                      onClick={() => navigate(`/properties/${p.id}/edit`)}
                      className="px-2 py-1 bg-blue-500 hover:bg-blue-600 text-white rounded text-sm"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeleteProperty(p.id)}
                      className="px-2 py-1 bg-red-500 hover:bg-red-600 text-white rounded text-sm"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* New Booking Requests */}
      <section>
        <h2 className="text-2xl font-semibold mb-4">New Booking Requests</h2>
        <div className="overflow-x-auto bg-white rounded shadow">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-yellow-50">
              <tr>
                <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">Property</th>
                <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">Renter</th>
                <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">From</th>
                <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">To</th>
                <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {newRequests.length === 0 && (
                <tr>
                  <td colSpan="5" className="px-4 py-6 text-center text-gray-500">
                    No new booking requests.
                  </td>
                </tr>
              )}
              {newRequests.map(b => (
                <tr key={b.id}>
                  <td className="px-4 py-2 whitespace-nowrap">{b.property.title}</td>
                  <td className="px-4 py-2 whitespace-nowrap">{b.user.name}</td>
                  <td className="px-4 py-2 whitespace-nowrap">
                    {new Date(b.startDate).toLocaleDateString()}
                  </td>
                  <td className="px-4 py-2 whitespace-nowrap">
                    {new Date(b.endDate).toLocaleDateString()}
                  </td>
                  <td className="px-4 py-2 whitespace-nowrap space-x-2">
                    <button
                      onClick={() => updateBookingStatus(b.id, 'confirmed')}
                      className="px-2 py-1 bg-green-500 hover:bg-green-600 text-white rounded text-sm"
                    >
                      Approve
                    </button>
                    <button
                      onClick={() => updateBookingStatus(b.id, 'rejected')}
                      className="px-2 py-1 bg-red-500 hover:bg-red-600 text-white rounded text-sm"
                    >
                      Cancel
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Rental History */}
      <section>
        <h2 className="text-2xl font-semibold mb-4">Rental History</h2>
        <div className="overflow-x-auto bg-white rounded shadow">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">Property</th>
                <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">Renter</th>
                <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">From</th>
                <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">To</th>
                <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {pastBookings.length === 0 && (
                <tr>
                  <td colSpan="5" className="px-4 py-6 text-center text-gray-500">
                    No past bookings.
                  </td>
                </tr>
              )}
              {pastBookings.map(b => (
                <tr key={b.id}>
                  <td className="px-4 py-2 whitespace-nowrap">{b.property.title}</td>
                  <td className="px-4 py-2 whitespace-nowrap">{b.user.name}</td>
                  <td className="px-4 py-2 whitespace-nowrap">
                    {new Date(b.startDate).toLocaleDateString()}
                  </td>
                  <td className="px-4 py-2 whitespace-nowrap">
                    {new Date(b.endDate).toLocaleDateString()}
                  </td>
                  <td className="px-4 py-2 whitespace-nowrap capitalize">{b.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
};

export default OwnerDashboard;
