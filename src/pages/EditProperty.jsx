import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axiosInstance from "../api/axiosInstance";

export default function EditProperty() {
  const { id } = useParams();
  const navigate = useNavigate();

//   const [loading,setLoading]=useState(false);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    location: ""
  });
  const [existingImages, setExistingImages] = useState([]); // current URLs
  const [newFiles, setNewFiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  // Fetch existing property
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
        setExistingImages(prop.images || [prop.image]);
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

  if (loading) return <p className="text-center mt-10">Loading property...</p>;

  return (
    <div className="max-w-xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">Edit Property</h2>
      {error && <p className="text-red-600 mb-4">{error}</p>}
      <form onSubmit={handleSubmit} className="space-y-4" encType="multipart/form-data">
        {["title", "description", "location", "price"].map(field => (
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

        {/* Existing Images Preview */}
        {existingImages.length > 0 && (
          <div className="space-y-2">
            <label className="block font-medium">Existing Images</label>
            <div className="grid grid-cols-2 gap-2">
              {existingImages.map((url, idx) => (
                <img key={idx} src={url} alt="Existing" className="h-32 w-full object-cover rounded" />
              ))}
            </div>
          </div>
        )}

        {/* New Images Upload */}
        <div>
          <label className="block font-medium">Add More Images</label>
          <input
            type="file"
            name="images"
            accept="image/*"
            multiple
            onChange={handleFileChange}
            className="block mt-1"
          />
        </div>

        <button
          type="submit"
          disabled={submitting}
          className={`w-full px-4 py-2 text-white rounded ${submitting ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'}`}
        >
          {submitting ? 'Updating...' : 'Update Listing'}
        </button>
      </form>
    </div>
  );
}
