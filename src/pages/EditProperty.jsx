// import React, { useState, useEffect } from "react";
// import { useNavigate, useParams } from "react-router-dom";
// import axiosInstance from "../api/axiosInstance";

// export default function EditProperty() {
//   const { id } = useParams();
//   const navigate = useNavigate();

//   const [formData, setFormData] = useState({
//     title: "",
//     description: "",
//     price: "",
//     location: ""
//   });
//   const [existingImages, setExistingImages] = useState([]);
//   const [newFiles, setNewFiles] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [submitting, setSubmitting] = useState(false);
//   const [error, setError] = useState("");

//   useEffect(() => {
//     async function fetchProperty() {
//       try {
//         const res = await axiosInstance.get(`/properties/${id}`);
//         const prop = res.data;
//         setFormData({
//           title: prop.title,
//           description: prop.description,
//           price: prop.price,
//           location: prop.location
//         });
//         setExistingImages(prop.images || [prop.image]);
//       } catch (err) {
//         console.error("Failed to load property:", err);
//       } finally {
//         setLoading(false);
//       }
//     }
//     fetchProperty();
//   }, [id]);

//   const handleChange = e => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleFileChange = e => {
//     setNewFiles(e.target.files);
//   };

//   const handleSubmit = async e => {
//     e.preventDefault();
//     setSubmitting(true);
//     setError("");
//     try {
//       const data = new FormData();
//       Object.entries(formData).forEach(([key, value]) => {
//         data.append(key, value);
//       });
//       Array.from(newFiles).forEach(file => data.append("images", file));

//       const res = await axiosInstance.put(`/properties/${id}`, data, {
//         headers: { "Content-Type": "multipart/form-data" }
//       });
//       navigate(`/properties/${res.data.id}`);
//     } catch (err) {
//       console.error("Update Error:", err);
//       setError(err.response?.data?.message || err.message || "Update failed");
//     } finally {
//       setSubmitting(false);
//     }
//   };

//   if (loading) return <p className="text-center text-lg mt-16 text-gray-600">🔄 Loading property...</p>;

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-100 px-4 py-10 relative">
      
//       {/* Back Button (top-right corner) */}
//       <button
//         onClick={() => navigate(-1)}
//         className="absolute top-6 right-6 text-blue-600 hover:text-blue-800 font-semibold text-sm underline transition"
//       >
//         ← Go Back
//       </button>
  
//       <div className="max-w-3xl mx-auto p-8 bg-white rounded-3xl shadow-2xl animate-fadeIn border border-blue-100">
//         <h2 className="text-4xl font-bold text-blue-900 mb-8 text-center drop-shadow-sm">
//            Update Property Details
//         </h2>
  
//         {error && <p className="text-red-600 text-center mb-6 font-medium">{error}</p>}
  
//         <form onSubmit={handleSubmit} className="space-y-6" encType="multipart/form-data">
//           {["title", "description", "location", "price"].map(field => (
//             <div key={field} className="group">
//               <label className="block text-gray-700 font-semibold mb-1 capitalize">{field}</label>
//               <input
//                 name={field}
//                 type={field === "price" ? "number" : "text"}
//                 value={formData[field]}
//                 onChange={handleChange}
//                 placeholder={`Enter ${field}`}
//                 className="w-full p-3 rounded-xl border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
//                 required
//               />
//             </div>
//           ))}
  
//           {/* Existing Images */}
//           {existingImages.length > 0 && (
//             <div>
//               <h3 className="text-lg font-semibold text-gray-700 mb-2">📸 Existing Images</h3>
//               <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
//                 {existingImages.map((url, idx) => (
//                   <div
//                     key={idx}
//                     className="overflow-hidden rounded-xl shadow hover:scale-105 transition transform"
//                   >
//                     <img
//                       src={url}
//                       alt="Existing"
//                       className="h-32 w-full object-cover border border-gray-200"
//                     />
//                   </div>
//                 ))}
//               </div>
//             </div>
//           )}
  
//           {/* Upload New Images */}
//           <div>
//             <h3 className="text-lg font-semibold text-gray-700 mb-2">➕ Upload More Images</h3>
//             <input
//               type="file"
//               name="images"
//               accept="image/*"
//               multiple
//               onChange={handleFileChange}
//               className="w-full file:px-4 file:py-2 file:rounded file:border-0 file:bg-indigo-600 file:text-white hover:file:bg-indigo-700 cursor-pointer border rounded-lg"
//             />
//           </div>
  
//           {/* Submit */}
//           <button
//             type="submit"
//             disabled={submitting}
//             className={`w-full text-center py-3 rounded-xl font-semibold shadow-md transition ${
//               submitting
//                 ? 'bg-gray-400 cursor-not-allowed'
//                 : 'bg-indigo-600 hover:bg-indigo-700 text-white'
//             }`}
//           >
//             {submitting ? "⏳ Updating..." : "💾 Save Changes"}
//           </button>
//         </form>
//       </div>
//     </div>
//   );
//   }





import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axiosInstance from "../api/axiosInstance";

export default function EditProperty() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    location: ""
  });
  const [existingImages, setExistingImages] = useState([]);
  const [newFiles, setNewFiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchProperty() {
      try {
        const res = await axiosInstance.get(`/properties/${id}`);
        const prop = res.data;
        setFormData({
          title: prop.title,
          description: prop.description,
          price: prop.price,
          location: prop.location
        });
        setExistingImages(prop.images || []);
      } catch (err) {
        console.error("Failed to load property:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchProperty();
  }, [id]);

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = e => {
    setNewFiles(e.target.files);
  };

  const handleDeleteProperty = async () => {
    if (!window.confirm("Are you sure you want to delete this property?")) return;
    try {
      await axiosInstance.delete(`/properties/${id}`);
      navigate('/host-property');
    } catch (err) {
      console.error('Failed to delete property', err);
      alert('Could not delete property.');
    }
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setSubmitting(true);
    setError("");
    try {
      const data = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        data.append(key, value);
      });
      Array.from(newFiles).forEach(file => data.append("images", file));

      const res = await axiosInstance.put(`/properties/${id}`, data, {
        headers: { "Content-Type": "multipart/form-data" }
      });
      navigate(`/properties/${res.data.id}`);
    } catch (err) {
      console.error("Update Error:", err);
      setError(err.response?.data?.message || err.message || "Update failed");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <p className="text-center text-lg mt-16 text-gray-600">🔄 Loading property...</p>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-100 px-4 py-10 relative">
      {/* Back Button */}
      <button
        onClick={() => navigate(-1)}
        className="absolute top-6 right-6 text-blue-600 hover:text-blue-800 font-semibold text-sm underline transition"
      >
        ← Go Back
      </button>

      {/* Delete Button */}
      <button
        onClick={handleDeleteProperty}
        className="absolute top-6 left-6 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-full transition"
      >
        Delete Property
      </button>

      <div className="max-w-3xl mx-auto p-8 bg-white rounded-3xl shadow-2xl animate-fadeIn border border-blue-100">
        <h2 className="text-4xl font-bold text-blue-900 mb-8 text-center drop-shadow-sm">
          Update Property Details
        </h2>

        {error && <p className="text-red-600 text-center mb-6 font-medium">{error}</p>}

        <form onSubmit={handleSubmit} className="space-y-6" encType="multipart/form-data">
          {Object.keys(formData).map(field => (
            <div key={field} className="group">
              <label className="block text-gray-700 font-semibold mb-1 capitalize">{field}</label>
              <input
                name={field}
                type={field === "price" ? "number" : "text"}
                value={formData[field]}
                onChange={handleChange}
                placeholder={`Enter ${field}`}
                className="w-full p-3 rounded-xl border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
                required
              />
            </div>
          ))}

          {/* Existing Images */}
          {existingImages.length > 0 && (
            <div>
              <h3 className="text-lg font-semibold text-gray-700 mb-2">📸 Existing Images</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {existingImages.map((url, idx) => (
                  <div key={idx} className="overflow-hidden rounded-xl shadow hover:scale-105 transition transform">
                    <img
                      src={url}
                      alt={`Existing ${idx}`}
                      className="h-32 w-full object-cover border border-gray-200"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Upload New Images */}
          <div>
            <h3 className="text-lg font-semibold text-gray-700 mb-2">➕ Upload More Images</h3>
            <input
              type="file"
              name="images"
              accept="image/*"
              multiple
              onChange={handleFileChange}
              className="w-full file:px-4 file:py-2 file:rounded file:border-0 file:bg-indigo-600 file:text-white hover:file:bg-indigo-700 cursor-pointer border rounded-lg"
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={submitting}
            className={`w-full text-center py-3 rounded-xl font-semibold shadow-md transition ${
              submitting
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-indigo-600 hover:bg-indigo-700 text-white'
            }`}
          >
            {submitting ? "⏳ Updating..." : "💾 Save Changes"}
          </button>
        </form>
      </div>
    </div>
  );
}
