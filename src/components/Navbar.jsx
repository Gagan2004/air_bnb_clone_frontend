import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { NavLink } from 'react-router-dom';


const Navbar = () => {
  const isLoggedIn = !!localStorage.getItem('token');

  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  // Redirect helper for protected routes
  const getLink = (path) => {

    if (!isLoggedIn) return '/login';

    if(path =="/dashboard"){

    if(localStorage.role =='ADMIN'){
        path = '/admin-dash'
    }
    if(localStorage.role =='OWNER'){
        path = '/owner-dash'
    }
    
  }

    return path;}

  return (
    <nav className="bg-white shadow p-4 flex justify-between items-center">
      {/* Brand */}
      <NavLink to="/" className="text-2xl font-bold text-red-500">
        StayEase
      </NavLink>

      {/* Center nav links */
      }
      <div className="flex space-x-6 justify-center items-center">

        <NavLink
          to={getLink('/')}
          className="text-gray-700 hover:text-red-500 font-medium active:text-orange-500"
          activeClassName="text-orange-500"

        >
         Home
        </NavLink>

        <NavLink
          to={getLink('/dashboard')}
          className="text-gray-700 hover:text-red-500 font-medium"
          activeClassName="text-orange-500"

        >
          Dashboard
      
        </NavLink>
        
        {/* <Navlink
          to={getLink('/wishlist')}
          className="text-gray-700 hover:text-red-500 font-medium"
        
          >
          Wishlis
          t
        </Navlink> */}

        {/* <Navlink
          to={getLink('/bookings')}
          className="text-gray-700 hover:text-red-500 font-medium"
        
          >
          My Bookings
      
      </Navlink> */}
        
        <NavLink
          to={getLink('/host-property')}
          className="text-gray-700 hover:text-red-500 font-medium"
        
        >
          Host Property
        </NavLink>
      </div>

      {/* Right side - login/register or logout */}
      <div className="flex items-center space-x-4">
        {!isLoggedIn ? (
          <>
            <Link to="/login" className="text-gray-700 hover:text-red-500">
              Login
            </Link>
            <Link to="/register" className="text-gray-700 hover:text-red-500">
              Register
            </Link>
          </>
        ) : (
          <button
            onClick={handleLogout}
            className="text-gray-700 hover:text-red-500"
          >
            Logout
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;






