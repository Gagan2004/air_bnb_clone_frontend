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

  const [files, setFiles] = useState([]); // Manage selected image files
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
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
        headers: {
          "Content-Type": "multipart/form-data"
        }
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
    <div className="max-w-xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">Host a Property</h2>

      <form onSubmit={handleSubmit} className="space-y-4" encType="multipart/form-data">
        {["title", "description", "location", "price"].map((field) => (
          <div key={field}>
            <label className="block font-medium capitalize">{field}</label>
            <input
              name={field}
              type={field === "price" ? "number" : "text"}
              value={formData[field]}
              onChange={handleChange}
              className="w-full border border-gray-300 p-2 rounded"
              required
            />
          </div>
        ))}

        {error && <p className="text-red-600">{error}</p>}

        <div>
          <label className="block font-medium">Images</label>
          <input
            type="file"
            name="images"
            accept="image/*"
            multiple
            onChange={(e) => setFiles(e.target.files)}
            className="block mt-1"
          />
        </div>

        <button
          type="submit"
          className="bg-black text-white px-4 py-2 rounded"
          disabled={loading}
        >
          {loading ? "Submitting..." : "Create Listing"}
        </button>
      </form>
    </div>
  );
}

