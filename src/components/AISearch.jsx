//   import React, { useState } from 'react';
//   import axiosInstance from '../api/axiosInstance';
//   import axios from 'axios';
//   import { useNavigate } from 'react-router-dom';

//   // <--- Initialize navigate hook


//   function AISearch({ onResults }) {
//     const [query, setQuery] = useState('');
//         const [loading, setLoading] = useState(false);
//     const navigate = useNavigate();



//   const handleSearch = async () => {
//     if (!query.trim()) return;

//     setLoading(true);

//     try {
//       const response = await axiosInstance.post('/ai-search', {
//         query:query
//       });

//       // try {
//       //   // 1) Make sure the URL includes "/api" so it matches your route mount:
//       //   // 2) Pass { query: trimmed } so the server receives { query: "Treehouse in Hawaii" }.
//       //   const response = await axiosInstance.post('http://localhost:3000/api/ai-search', {
//       //     query
//       //   });

//       const {message:filters} =  response.data;
//       // if (typeof filters !== 'string') {
//       //   throw new Error('Invalid AI response format');
//       // }

//       if (filters) {
      
//         navigate('/search-results', {
//           state: {
//             filters: filters,
//             originalQuery: query // Optionally pass the original query for display on the search page
//           }
//         }
//         )

//       } else {
//         console.error('No filters returned from AI');
//       }
//     } catch (error) {
//       console.error('AI search failed:', error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleKeyDown = (e) => {
//     if (e.key === 'Enter') handleSearch();
   
//   };

//   return (
//     <div className="flex items-center gap-3">
//       <input
//         type="text"
//         placeholder="Try: Beach houses in Goa under ₹4000 with wifi"
//         value={query}
//         onChange={(e) => setQuery(e.target.value)}
//         onKeyDown={handleKeyDown}
//         className="w-full p-3 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
//       />
//       <button
//         onClick={handleSearch}
//         disabled={loading}
//         className="bg-blue-600 text-white px-5 py-3 rounded-xl hover:bg-blue-700 transition disabled:opacity-60 whitespace-nowrap"
//         >
//         {loading ? 'Searching...' : 'Ask AI'}
//       </button>
//     </div>
//   );
// }



//   export default AISearch;





// components/AISearch.jsx
import React, { useState } from 'react';
import axiosInstance from '../api/axiosInstance';
import { useNavigate } from 'react-router-dom';

function AISearch() {
  const [query, setQuery]   = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSearch = async () => {
    if (!query.trim()) return;
    setLoading(true);

    try {
      // 1. Ask your /ai-search service for a `where` clause
      const aiRes = await axiosInstance.post('/ai-search', { query });
      const aiWhere = aiRes.data.where || {};

      // 2. Hit your unified /properties/search endpoint with that filter
      const searchRes = await axiosInstance.post('/properties/search', {
        where:  aiWhere,
        page:   1,
        limit:  9,
      });

      // 3. Navigate to your results page, passing the response payload
      navigate('/search-results', {
        state: {
          properties:  searchRes.data.properties,
          totalPages:  searchRes.data.totalPages,
          page:        searchRes.data.page,
          aiWhere,
          originalQuery: query,
        }
      });
    } catch (err) {
      console.error('AI search failed:', err);
    } finally {
      setLoading(false);
    }
  };

  const onKeyDown = e => { if (e.key === 'Enter') handleSearch(); };

  return (
    <div className="flex items-center gap-3">
      <input
        type="text"
        placeholder="Try: Beach houses in Goa under ₹4000 with wifi"
        value={query}
        onChange={e => setQuery(e.target.value)}
        onKeyDown={onKeyDown}
        className="flex-1 p-3 border rounded-xl focus:ring focus:outline-none"
      />
      <button
        onClick={handleSearch}
        disabled={loading}
        className="px-5 py-3 bg-blue-600 text-white rounded-xl disabled:opacity-50"
      >
        {loading ? 'Searching…' : 'Ask AI'}
      </button>
    </div>
  );
}

export default AISearch;
