// // import { Link } from "react-router-dom";

// // const Navbar = () => {
// //   return (
// //     <nav className="bg-white shadow p-4 flex justify-between items-center sticky top-0 z-50">
// //       <Link to="/" className="text-2xl font-bold text-blue-600">
// //         StayNest
// //       </Link>

// //       <div className="space-x-4">
// //         <Link to="/" className="text-gray-700 hover:text-blue-500 font-medium">
// //           Home
// //         </Link>
// //         <Link to="/wishlist" className="text-gray-700 hover:text-blue-500 font-medium">
// //           Wishlist
// //         </Link>
// //         <Link to="/my-bookings" className="text-gray-700 hover:text-blue-500 font-medium">
// //           My Bookings
// //         </Link>
// //         <Link to="/host-property" className="text-gray-700 hover:text-blue-500 font-medium">
// //           HOST
// //           </Link>
// //         <Link to="/login" className="text-white bg-blue-500 px-4 py-1 rounded hover:bg-blue-600">
// //           Login
// //         </Link>
// //         <Link to="/dashboard" className="text-gray-700 hover:text-red-500">
// //           Dashboard
// //         </Link>
// //       </div>
// //     </nav>
// //   );
// // };

// // export default Navbar;


// // src/components/Navbar.jsx
// // --------------------------
// import React from 'react';
// import { Link } from 'react-router-dom';

// const Navbar = () => {
//   const isLoggedIn = !!localStorage.getItem('token');

//   return (
//     <nav className="bg-white shadow p-4 flex justify-between items-center">
//       <Link to="/" className="text-xl font-bold text-red-500">
//         StayEase
//       </Link>
//       <div className="space-x-4">
//         {!isLoggedIn && (
//           <>
//             <Link to="/register" className="text-gray-700 hover:text-red-500">
//               Host
//             </Link>
//             <Link to="/login" className="text-gray-700 hover:text-red-500">
//               Login
//             </Link>
//             <Link to="/register" className="text-gray-700 hover:text-red-500">
//               Register
//             </Link>
             
//           </>
//         )}
//         {isLoggedIn && (
//           <>
//         <Link to="/my-bookings" className="text-gray-700 hover:text-blue-500 font-medium">
//           My Bookings
//         </Link>
//             <Link to="/host-property" className="text-gray-700 hover:text-red-500">
//               Host
//             </Link>
//             <Link to="/wishlist" className="text-gray-700 hover:text-blue-500 font-medium">
//           Wishlist
//         </Link>
//             <Link to="/dashboard" className="text-gray-700 hover:text-red-500">
//               Dashboard
//             </Link>
//           </>
//         )}
//       </div>
//     </nav>
//   );
// };

// export default Navbar;


// import React, { useState } from 'react';
// import { Link, useNavigate } from 'react-router-dom';

// const Navbar = () => {
//   const isLoggedIn = !!localStorage.getItem('token');
//   const navigate = useNavigate();
//   const [isMenuOpen, setIsMenuOpen] = useState(false);

//   const handleLogout = () => {
//     localStorage.removeItem('token');
//     navigate('/');
//   };

//   const toggleMenu = () => {
//     setIsMenuOpen((prev) => !prev);
//   };

//   return (
//     <nav className="bg-white shadow p-4 flex justify-between items-center">
//       <Link to="/" className="text-xl font-bold text-black-500 space-x-4">
//         StayEase
//       </Link>
//       <div className="space-x-4 relative">
//         {!isLoggedIn && (
//           <>
//             <Link to="/register" className="text-gray-700 hover:text-red-500">
//               Host
//             </Link>
//             <Link to="/login" className="text-gray-700 hover:text-red-500">
//               Login
//             </Link>
//             <Link to="/register" className="text-gray-700 hover:text-red-500">
//               Register
//             </Link>
//           </>
//         )}
//         {isLoggedIn && (


//           <div className="relative inline text-left">

// <Link to="/dashboard" className="text-gray-700 hover:text-red-500 font-medium m-4 ">
//   <button>Dash</button>             
//             </Link>
//               <button
//               onClick={toggleMenu}
//               className="text-gray-700 hover:text-red-500 font-medium"
//             >
//               PROFILE▾
//             </button>
//             {isMenuOpen && (
//               <div className="absolute right-0 mt-2 w-48 bg-white border rounded-md shadow-lg z-10">
//                 <Link
//                   to="/my-bookings"
//                   className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
//                 >
//                   My Bookings
//                 </Link>
//                 <Link
//                   to="/host-property"
//                   className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
//                 >
//                   Host
//                 </Link>
//                 <Link
//                   to="/wishlist"
//                   className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
//                 >
//                   Wishlist
//                 </Link>
//                 <button
//                   onClick={handleLogout}
//                   className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
//                 >
//                   Logout
//                 </button>
//               </div>
//             )}
//           </div>
//         )}
//       </div>
//     </nav>
//   );
// };

// export default Navbar;


// src/components/Navbar.jsx
// --------------------------
// import React, { useState } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import { FaUserCircle } from 'react-icons/fa';

// const Navbar = () => {
//   const isLoggedIn = !!localStorage.getItem('token');
//   const navigate = useNavigate();
//   const [dropdownOpen, setDropdownOpen] = useState(false);

//   const handleLogout = () => {
//     localStorage.removeItem('token');
//     navigate('/');
//   };

//   return (
//     <nav className="bg-white shadow p-4 flex justify-between items-center">
//       <Link to="/" className="text-xl font-bold text-red-500">
//         StayEase
//       </Link>
//       <div className="space-x-4 relative">
//         {!isLoggedIn && (
//           <>
//           <Link
//                   to="/login"
//                   className="text-gray-700 hover:text-red-500"
//                   // onClick={() => setDropdownOpen(false)}
//                 >
//                   My Bookings
//                 </Link>

//             <Link to="/register" className="text-gray-700 hover:text-red-500">
//               Host
//             </Link>
//             <Link to="/login" className="text-gray-700 hover:text-red-500">
//               Login
//             </Link>
//             <Link to="/register" className="text-gray-700 hover:text-red-500">
//               Register
//             </Link>
            
//           </>
//         )}
//         {isLoggedIn && (
//           <div className="relative inline-block text-left">
//             {/* // <Link to="/dashboard" className="text-gray-700 hover:text-red-500 font-medium m-4 ">
// //   <button>Dash</button>   */}
//             <button
//               onClick={() => setDropdownOpen(!dropdownOpen)}
//               className="flex items-center space-x-2 text-gray-700 hover:text-red-500"
//             >
//               <FaUserCircle className="text-2xl" />
//               <span>USER</span>
//             </button>
//             {dropdownOpen && (
//               <div className="absolute right-0 mt-2 w-48 bg-white border rounded shadow-lg z-50">
                
//                 <Link to="/dashboard" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
//                   onClick={() => setDropdownOpen(false)}>
// //   <button>Dashboard</button> </Link>
                
//                 <Link
//                   to="/wishlist"
//                   className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
//                   onClick={() => setDropdownOpen(false)}
//                 >
//                   Wishlist
//                 </Link>
//                 <Link
//                   to="/my-bookings"
//                   className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
//                   onClick={() => setDropdownOpen(false)}
//                 >
//                   My Bookings
//                 </Link>
//                 <Link
//                   to="/host-property"
//                   className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
//                   onClick={() => setDropdownOpen(false)}
//                 >
//                   Host
//                 </Link>
//                 <button
//                   onClick={() => {
//                     handleLogout();
//                     setDropdownOpen(false);
//                   }}
//                   className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
//                 >
//                   Logout
//                 </button>
//               </div>
//             )}
//           </div>
//         )}
//       </div>
//     </nav>
//   );
// };

// export default Navbar;


import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const isLoggedIn = !!localStorage.getItem('token');

  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  // Redirect helper for protected routes
  const getLink = (path) => (isLoggedIn ? path : '/login');

  return (
    <nav className="bg-white shadow p-4 flex justify-between items-center">
      {/* Brand */}
      <Link to="/" className="text-xl font-bold text-red-500">
        StayEase
      </Link>

      {/* Center nav links */}
      <div className="flex space-x-6 justify-center items-center">
        <Link
          to={getLink('/dashboard')}
          className="text-gray-700 hover:text-red-500 font-medium"
        >
          Dashboard
        </Link>
        {/* <Link
          to={getLink('/wishlist')}
          className="text-gray-700 hover:text-red-500 font-medium"
        >
          Wishlist
        </Link> */}
        <Link
          to={getLink('/bookings')}
          className="text-gray-700 hover:text-red-500 font-medium"
        >
          My Bookings
        </Link>
        <Link
          to={getLink('/host-property')}
          className="text-gray-700 hover:text-red-500 font-medium"
        >
          Host
        </Link>
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


