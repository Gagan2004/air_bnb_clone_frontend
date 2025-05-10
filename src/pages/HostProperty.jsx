// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import axiosInstance from "../api/axiosInstance";

// export default function HostProperty() {
//   const navigate = useNavigate();
//   const [formData, setFormData] = useState({
//     title: "",
//     description: "",
//     image: [],
//     price: "",
//     location: ""
//   });

//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setError("");

//     try {
//         const payload = {
//                    ...formData,
//                    price: Number(formData.price),
//                  };
//                  const res = await axiosInstance.post("/properties", payload);

//       navigate(`/properties/${res.data.id}`);
//     } catch (err) {
//         console.error("Submission Error:", err);
//         setError(err.response?.data?.message || err.message || "Something went wrong");
//       }
//        finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="max-w-xl mx-auto p-6">
//       <h2 className="text-2xl font-bold mb-4">Host a Property</h2>

//       <form onSubmit={handleSubmit} className="space-y-4"  encType="multipart/form-data">
//         {["title", "description", "location", "price"].map((field) => (
//           <div key={field}>
//             <label className="block font-medium capitalize">{field}</label>
//             <input
//               name={field}
//               type={field === "price" ? "number" : "text"}
//               value={formData[field]}
//               onChange={handleChange}
//               className="w-full border border-gray-300 p-2 rounded"
//               required
//             />
//           </div>
//         ))}

// {error && <p className="text-red-600">{error}</p>}


// <div>
//     <label>Images</label>
//     <input
//       type="file"
//       name="images"
//       accept="image/*"
//       multiple
//       onChange={e => setFiles(e.target.files)}
//     />
//   </div>


//         <button
//           type="submit"
//           className="bg-black text-white px-4 py-2 rounded"
//           disabled={loading}
//         >
//           {loading ? "Submitting..." : "Create Listing"}
//         </button>
//       </form>
//     </div>
//   );
// }

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../api/axiosInstance";

export default function HostProperty() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    location: ""
  });

  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setFiles(e.target.files);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const data = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        data.append(key, value);
      });
      Array.from(files).forEach((file) => data.append("images", file));

      const res = await axiosInstance.post("/properties", data, {
        headers: { "Content-Type": "multipart/form-data" }
      });

      navigate(`/properties/${res.data.id}`);
    } catch (err) {
      console.error("Submission Error:", err);
      setError(err.response?.data?.message || err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-slate-50 to-gray-100 p-8 flex items-center justify-center">
      <div className="w-full max-w-2xl bg-white rounded-2xl shadow-xl p-8 border border-gray-200">
        <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
          Host a Property...
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          {["title", "description", "location", "price"].map((field) => (
            <div key={field}>
              <label className="block mb-1 font-semibold text-gray-700 capitalize">
                {field}
              </label>
              <input
                name={field}
                type={field === "price" ? "number" : "text"}
                value={formData[field]}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                placeholder={`Enter ${field}`}
                required
              />
            </div>
          ))}

          <div>
            <label className="block mb-1 font-semibold text-gray-700">Images</label>
            <input
              type="file"
              name="images"
              accept="image/*"
              multiple
              onChange={handleFileChange}
              className="block w-full text-sm text-gray-600 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
            />
            {files.length > 0 && (
              <div className="mt-4 flex flex-wrap gap-2">
                {Array.from(files).map((file, idx) => (
                  <img
                    key={idx}
                    src={URL.createObjectURL(file)}
                    alt="preview"
                    className="w-20 h-20 object-cover rounded shadow-sm border"
                  />
                ))}
              </div>
            )}
          </div>

          {error && (
            <p className="text-red-600 bg-red-50 border border-red-200 p-3 rounded text-sm">
              {error}
            </p>
          )}

          <button
            type="submit"
            className={`w-full text-center font-semibold py-3 px-6 rounded-lg transition duration-300 ${
              loading
                ? "bg-gray-400 cursor-not-allowed text-white"
                : "bg-blue-600 hover:bg-blue-700 text-white"
            }`}
            disabled={loading}
          >
            {loading ? "Submitting..." : "Create Listing"}
          </button>
        </form>
      </div>
    </div>
  );
}
