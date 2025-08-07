// // src/pages/SearchResultsPage.jsx
// import React, { useEffect, useState } from 'react';
// import { useLocation, Link } from 'react-router-dom'; // <--- Import useLocation
// import axiosInstance from '../api/axiosInstance';
// import PropertyCard from '../components/PropertyCard'; // Assuming you have this component

// const SearchResultsPage = () => {
//     const location = useLocation(); // <--- Get the location object from react-router-dom
//     const [properties, setProperties] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(null);
//     const [originalQuery, setOriginalQuery] = useState(''); // To display the user's original AI query

//     // Extract filters from location.state
//     const { filters } = location.state || {}; // Get filters, default to empty object if state is null
//     const { originalQuery: queryText } = location.state || {};

//     // This useEffect will run when the component mounts or when filters change
//     useEffect(() => {
//         const fetchFilteredProperties = async () => {
//             setLoading(true);
//             setError(null); // Clear previous errors
//             setOriginalQuery(queryText || ''); // Set the original query text

//             // If no filters were passed (e.g., direct navigation to /search-results),
//             // you might want to redirect, show a message, or fetch all properties.
//             if (!filters || Object.keys(filters).length === 0) {
//                 setError('No valid search filters provided.');
//                 setLoading(false);
//                 setProperties([]); // Clear properties if no filters
//                 return;
//             }

//             try {
//                 const { location, maxPrice, guestCount, amenities } = filters;
//                 const queryParams = new URLSearchParams();

//                 // Build the URL query parameters based on the received filters
//                 if (location) queryParams.append('location', location);
//                 // Important: Match your backend's expected parameter names
//                 if (maxPrice) queryParams.append('price', maxPrice); // Assuming backend expects 'price' for max
//                 if (guestCount) queryParams.append('guests', guestCount);
//                 if (amenities && amenities.length > 0)
//                     queryParams.append('amenities', amenities.join(','));

//                 const url = `/properties/search?${queryParams.toString()}`;
                
//                 const response = await axiosInstance.get(url);
//                 setProperties(response.data.properties || []);

//             } catch (err) {
//                 setError('Failed to load search results.');
//                 console.error('Search results fetch error:', err);
//             } finally {
//                 setLoading(false);
//             }
//         };

//         fetchFilteredProperties();
//     }, [filters, queryText]); // Re-run effect if filters or queryText change

//     if (loading)
//         return (
//             <div className="flex justify-center items-center h-screen bg-gray-50 text-gray-500 text-xl animate-pulse">
//                 Loading search results...
//             </div>
//         );

//     if (error)
//         return (
//             <div className="flex justify-center items-center h-screen bg-gray-50 text-red-600 text-lg font-semibold">
//                 {error}
//             </div>
//         );

//     return (
//         <main className="min-h-screen bg-gradient-to-br from-white to-slate-100 py-12 px-4">
//             <div className="max-w-7xl mx-auto">
//                 <header className="mb-10 text-center">
//                     <h1 className="text-4xl font-bold text-gray-800 mb-2 tracking-tight">
//                         Search Results
//                     </h1>
//                     {originalQuery && (
//                         <p className="text-gray-500 text-lg">
//                             Results for: "{originalQuery}"
//                         </p>
//                     )}
//                     {properties.length === 0 && !loading && !error && (
//                         <p className="text-gray-500 text-lg">
//                             No properties found matching your criteria.
//                         </p>
//                     )}
//                 </header>

//                 {/* Properties Grid */}
//                 <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
//                     {properties.map((prop) => (
//                         <Link to={`/properties/${prop.id}`} key={prop.id}>
//                             <div className="transform transition duration-300 hover:scale-[1.02] hover:shadow-xl">
//                                 <PropertyCard property={prop} />
//                             </div>
//                         </Link>
//                     ))}
//                 </section>
//             </div>
//         </main>
//     );
// };

// export default SearchResultsPage;







// pages/SearchResults.jsx
import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import PropertyCard from '../components/PropertyCard';
import axiosInstance from '../api/axiosInstance';

const PAGE_SIZE = 9;

export default function SearchResults() {
  const { state } = useLocation();
  const navigate  = useNavigate();

  // initialize from navigation state, or empty if user refreshed
  const [properties, setProperties] = useState(state?.properties || []);
  const [page,       setPage]       = useState(state?.page || 1);
  const [totalPages,setTotalPages]  = useState(state?.totalPages || 1);
  const [aiWhere]    = useState(state?.aiWhere || {});
  const [loading, setLoading]       = useState(false);

  const fetchPage = async (newPage) => {
    setLoading(true);
    try {
      const res = await axiosInstance.post('/properties/search', {
        where: aiWhere,
        page:  newPage,
        limit: PAGE_SIZE,
      });
      setProperties(res.data.properties);
      setTotalPages(res.data.totalPages);
      setPage(res.data.page);
    } catch (err) {
      console.error('Search pagination error:', err);
    } finally {
      setLoading(false);
    }
  };

  const onPrev = () => fetchPage(Math.max(1, page-1));
  const onNext = () => fetchPage(Math.min(totalPages, page+1));

  return (
    <main className="min-h-screen bg-gray-50 p-6">
      <header className="mb-6 text-center">
        
        <h1 className="text-3xl font-bold">
          Results for “{state?.originalQuery || 'Your Search'}”
        </h1>
      </header>

      {loading ? (
        <p className="text-center">Loading page {page}…</p>
      ) : (
        <>
          <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {properties.map(p => (
              <PropertyCard key={p.id} property={p} />
            ))}
          </section>

          <nav className="flex justify-center items-center mt-8 space-x-4">
            <button
              onClick={onPrev}
              disabled={page === 1}
              className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
            >
              Prev
            </button>
            <span>Page {page} of {totalPages}</span>
            <button
              onClick={onNext}
              disabled={page === totalPages}
              className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
            >
              Next
            </button>
          </nav>
        </>
      )}
    </main>
  );
}
