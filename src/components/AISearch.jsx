  import React, { useState } from 'react';
  import axiosInstance from '../api/axiosInstance';
  import axios from 'axios';
  import { useNavigate } from 'react-router-dom';

  // <--- Initialize navigate hook


  function AISearch({ onResults }) {
    const [query, setQuery] = useState('');
        const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

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
  //         setQuery('');
  //         onResults(filters); // You can use fetchProperties(filters) in Home
  //       } else {
  //         console.error('No filters returned from AI');
  //       }
  //       setQuery('')
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
  //         className="bg-blue-600 text-white px-5 py-2 rounded-xl hover:bg-blue-700 transition disabled:opacity-60"
  //       >
  //         {loading ? 'Searching...' : 'Ask AI'}
  //       </button>
  //     </div>
  //   );
  // }

  const handleSearch = async () => {
    if (!query.trim()) return;

    setLoading(true);

    try {
      const response = await axiosInstance.post('/ai-search', {
        query:query
      });

      // try {
      //   // 1) Make sure the URL includes "/api" so it matches your route mount:
      //   // 2) Pass { query: trimmed } so the server receives { query: "Treehouse in Hawaii" }.
      //   const response = await axiosInstance.post('http://localhost:3000/api/ai-search', {
      //     query
      //   });

      const {message:filters} =  response.data;
      // if (typeof filters !== 'string') {
      //   throw new Error('Invalid AI response format');
      // }

      if (filters) {
      
        navigate('/search-results', {
          state: {
            filters: filters,
            originalQuery: query // Optionally pass the original query for display on the search page
          }
        }
        )

      } else {
        console.error('No filters returned from AI');
      }
    } catch (error) {
      console.error('AI search failed:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') handleSearch();
   
  };

  return (
    <div className="flex items-center gap-3">
      <input
        type="text"
        placeholder="Try: Beach houses in Goa under ₹4000 with wifi"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={handleKeyDown}
        className="w-full p-3 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
      />
      <button
        onClick={handleSearch}
        disabled={loading}
        className="bg-blue-600 text-white px-5 py-3 rounded-xl hover:bg-blue-700 transition disabled:opacity-60 whitespace-nowrap"
        >
        {loading ? 'Searching...' : 'Ask AI'}
      </button>
    </div>
  );
}



  export default AISearch;
