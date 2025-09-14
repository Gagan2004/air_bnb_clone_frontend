

// // Home.jsx (Simplified for clarity - no longer passes filters from AI)
// import React, { useEffect, useState } from 'react';
// import axiosInstance from '../api/axiosInstance';
// import PropertyCard from '../components/PropertyCard';
// import { Link } from 'react-router-dom';
// import AISearch from '../components/AISearch'; // Still render the search bar

// const Home = () => {
//   const [properties, setProperties] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   // This fetchProperties will now only fetch the general list of properties
//   // It no longer receives 'filters' from AISearch
//   const fetchProperties = async () => { // <--- No 'filters' parameter here now
//     setLoading(true);
//     try {
//       // This URL should target your backend endpoint for ALL properties
//       // which you described as /properties?page=1&limit=20
//       const response = await axiosInstance.get('/properties');
//       setProperties(response.data.properties || []);
//       setError(null);
//     } catch (err) {
//       setError('Failed to load properties');
//       console.error(err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchProperties(); // Initial fetch of all properties
//   }, []);

//   if (loading)
//     return (
//       <div className="flex justify-center items-center h-screen bg-gray-50 text-gray-500 text-xl animate-pulse">
//         Loading properties...
//       </div>
//     );

//   if (error)
//     return (
//       <div className="flex justify-center items-center h-screen bg-gray-50 text-red-600 text-lg font-semibold">
//         {error}
//       </div>
//     );

//   return (
//     <main className="min-h-screen bg-gradient-to-br from-white to-slate-100 py-12 px-4">
//       <div className="max-w-7xl mx-auto">
//         <header className="mb-10 text-center">
//           <h1 className="text-4xl font-bold text-gray-800 mb-2 tracking-tight">
//             Find Your Next Stay
//           </h1>
//           <p className="text-gray-500 text-lg">
//             Search by location, price, amenities, or just ask “Show beach villas in Goa under ₹3000 with pool”
//           </p>
//         </header>

//         {/* AI Search Bar - No onResults prop needed here anymore */}
//         <div className="max-w-2xl mx-auto mb-12">
//           <AISearch /> {/* <--- No onResults prop */}
//         </div>

//         {/* Properties Grid - Displays all properties */}
//         <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
//           {properties.map((prop) => (
//             <Link to={`/properties/${prop.id}`} key={prop.id}>
//               <div className="transform transition duration-300 hover:scale-[1.02] hover:shadow-xl">
//                 <PropertyCard property={prop} />
//               </div>
//             </Link>
//           ))}
//         </section>
//       </div>
//     </main>
//   );
// };

// export default Home;





import React, { useEffect, useState } from 'react';
import axiosInstance from '../api/axiosInstance';
import PropertyCard from '../components/PropertyCard';
import { Link } from 'react-router-dom';
import AISearch from '../components/AISearch';

const PAGE_SIZE = 9; // show 9 cards per page (3×3 grid)

const Home = () => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading]     = useState(true);
  const [error, setError]         = useState(null);

  // pagination state
  const [page, setPage]           = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchProperties = async (page = 1) => {
    setLoading(true);
    setError(null);
    try {
      const res = await axiosInstance.get(`/properties?page=${page}&limit=${PAGE_SIZE}`);
      setProperties(res.data.properties || []);
      setTotalPages(res.data.totalPages || 1);
    } catch (err) {
      console.error(err);
      setError('Failed to load properties');
    } finally {
      setLoading(false);
    }
  };

  // re-fetch whenever page changes
  useEffect(() => {
    fetchProperties(page);
  }, [page]);

  if (loading) return (
    <div className="flex justify-center items-center h-screen bg-gray-50 text-gray-500 text-xl animate-pulse">
      Loading properties...
    </div>
  );

  if (error) return (
    <div className="flex justify-center items-center h-screen bg-gray-50 text-red-600 text-lg font-semibold">
      {error}
    </div>
  );

  return (
    <main className="min-h-screen bg-gradient-to-br from-white to-slate-100 py-12 px-4">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Header */}
        <header className="text-center space-y-2">
          <h1 className="text-4xl font-bold text-gray-800 tracking-tight">
            Your Next Stay COULD BE ::::
          </h1>
          <p className="text-gray-500 text-lg">
            Search by location, price, amenities, or just ask “Show beach villas under ₹3000 with pool”
          </p>
        </header>

        {/* AI Search Bar */}
        <div className="max-w-2xl mx-auto">
          <AISearch onResults={(filtered) => {
            // optional: override with AI results (resets pagination)
            setProperties(filtered);
            setTotalPages(1);
            setPage(1);
          }} />
        </div>

        {/* Grid */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {properties.map(prop => (
            <Link to={`/properties/${prop.id}`} key={prop.id}>
              <PropertyCard property={prop} />
            </Link>
          ))}
        </section>

        {/* Pagination Controls */}
        <nav className="flex justify-center items-center space-x-4">
          <button
            onClick={() => setPage(p => Math.max(1, p - 1))}
            disabled={page === 1}
            className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
          >
            Prev
          </button>
          <span className="text-gray-700">
            Page {page} of {totalPages}
          </span>
          <button
            onClick={() => setPage(p => Math.min(totalPages, p + 1))}
            disabled={page === totalPages}
            className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
          >
            Next
          </button>
        </nav>
      </div>
    </main>
  );
};

export default Home;

