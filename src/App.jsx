import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Wishlist from './pages/Wishlist';
import Login from './pages/Login';
import Register from './pages/Register';
import PropertyDetail from './pages/PropertyDetail';
import Dashboard from './pages/Dashboard';
import HostProperty from './pages/HostProperty';
import ManageBooking from './pages/ManageBooking';
import EditProperty from './pages/EditProperty';
import Bookings from './pages/Bookings';
import SearchResultsPage from './pages/SearchResultsPage'; // <--- Your new search results page
import AdminDashboard from './pages/AdminDash';
import OwnerDashboard from './pages/OwnerDash';


   

function App() {
  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/bookings" element={<Bookings />} />
        <Route path="/properties/:id" element={<PropertyDetail />} />
        <Route path="/wishlist" element={<Wishlist />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/host-property" element={<HostProperty />} />
        <Route path="/manage-booking/:bookingId" element={<ManageBooking />} />
        <Route path="/properties/:id/edit" element={<EditProperty />} />
        <Route path="/search-results" element={<SearchResultsPage />} />
        <Route path='/admin-dash' element={<AdminDashboard/>} />
        <Route path='/owner-dash' element={<OwnerDashboard/>} />


      </Routes>
    </div>
  );
}

export default App;
