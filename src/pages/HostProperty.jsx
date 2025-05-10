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
      Object.entries(formData).forEach(([key, value]) => data.append(key, value));
      Array.from(files).forEach(file => data.append("images", file));

      const res = await axiosInstance.post("/properties", data, {
        headers: { "Content-Type": "multipart/form-data" }
      });

      navigate(`/properties/${res.data.id}`);
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4 py-10"
>
      <div className="w-full max-w-2xl bg-white rounded-2xl shadow-xl p-8">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
          Host Your Property
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          {["title", "description", "location", "price"].map((field) => (
            <div key={field}>
              <label className="block text-sm font-medium text-gray-700 capitalize mb-1">
                {field}
              </label>
              <input
                type={field === "price" ? "number" : "text"}
                name={field}
                value={formData[field]}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-gray-900 text-gray-800"
              />
            </div>
          ))}

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Upload Images
            </label>
            <input
              type="file"
              accept="image/*"
              multiple
              onChange={handleFileChange}
              className="block w-full text-sm text-gray-600 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:bg-gray-800 file:text-white hover:file:bg-gray-700"
            />

            {files.length > 0 && (
              <div className="grid grid-cols-3 gap-3 mt-4">
                {Array.from(files).map((file, i) => (
                  <img
                    key={i}
                    src={URL.createObjectURL(file)}
                    alt="preview"
                    className="h-24 w-full object-cover rounded-md border"
                  />
                ))}
              </div>
            )}
          </div>

          {error && (
            <p className="text-red-600 text-sm font-medium">{error}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-2 px-4 text-sm font-medium rounded-md transition ${
              loading
                ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                : "bg-gray-900 text-white hover:bg-gray-800"
            }`}
          >
            {loading ? "Submitting..." : "Submit"}
          </button>
        </form>
      </div>
    </div>
  );
}
