import React, { useEffect, useState } from 'react';
import axiosInstance from '../api/axiosInstance';

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [properties, setProperties] = useState([]);
  const [metrics, setMetrics] = useState({ activeListings: 0, totalBookings: 0, flaggedCount: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [uRes, pRes, mRes] = await Promise.all([
          axiosInstance.get('/admin/users'),
          axiosInstance.get('/admin/properties'),
          axiosInstance.get('/admin/metrics')
        ]);
        setUsers(uRes.data.users);
        setProperties(pRes.data.properties);
        setMetrics(mRes.data);
      } catch (err) {
        console.error('Admin fetch error', err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const togglePropertyStatus = async (propId, currentStatus) => {
    try {
      await axiosInstance.patch(`/admin/properties/${propId}`, { active: !currentStatus });
      setProperties(props => props.map(p => p.id === propId ? { ...p, active: !currentStatus } : p));
    } catch (err) {
      console.error('Failed to update property status', err);
    }
  };

  if (loading) return <p className="text-center mt-10">Loading admin dashboard...</p>;

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-8">
      <h1 className="text-4xl font-bold text-gray-800">Admin Dashboard</h1>

      {/* Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="p-4 bg-white rounded shadow">
          <h3 className="text-lg font-semibold">Active Listings</h3>
          <p className="text-2xl font-bold">{metrics.activeListings}</p>
        </div>
        <div className="p-4 bg-white rounded shadow">
          <h3 className="text-lg font-semibold">Total Bookings</h3>
          <p className="text-2xl font-bold">{metrics.totalBookings}</p>
        </div>
        <div className="p-4 bg-white rounded shadow">
          <h3 className="text-lg font-semibold">Flagged Content</h3>
          <p className="text-2xl font-bold">{metrics.flaggedCount}</p>
        </div>
      </div>

      {/* Users Table */}
      <section>
        <h2 className="text-2xl font-semibold mb-4">All Users</h2>
        <div className="overflow-x-auto bg-white rounded shadow">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Email</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Role</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {users.map(u => (
                <tr key={u.id}>
                  <td className="px-6 py-4 whitespace-nowrap">{u.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{u.email}</td>
                  <td className="px-6 py-4 whitespace-nowrap capitalize">{u.role.toLowerCase()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Properties Table */}
      <section>
        <h2 className="text-2xl font-semibold mb-4">All Properties</h2>
        <div className="overflow-x-auto bg-white rounded shadow">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Title</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Owner</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {properties.map(p => (
                <tr key={p.id} className={p.active ? '' : 'opacity-50'}>
                  <td className="px-6 py-4 whitespace-nowrap">{p.title}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{p.user.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap capitalize">{p.active ? 'Active' : 'Inactive'}</td>
                   <td className="px-6 py-4 whitespace-nowrap">
                    <button
                      onClick={() => togglePropertyStatus(p.id, p.active)}
                      className={`px-3 py-1 rounded text-white ${p.active ? 'bg-red-500 hover:bg-red-600' : 'bg-green-500 hover:bg-green-600'}`}
                    >
                      {p.active ? 'Deactivate' : 'Approve'}
                    </button>
                  </td> 
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
};

export default AdminDashboard;
