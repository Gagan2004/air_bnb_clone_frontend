import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axiosInstance from "../api/axiosInstance";

const PropertyDetail = () => {
  const { id } = useParams();
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);
  const [bloading, setBloading] = useState(false);

  const [bookingDates, setBookingDates] = useState({ startDate: '', endDate: '' });
  const [bookingMessage, setBookingMessage] = useState('');

  const [reviews, setReviews] = useState([]);
  const [reviewForm, setReviewForm] = useState({ rating: 5, comment: '' });
  const [reviewMessage, setReviewMessage] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [propRes, revRes] = await Promise.all([
          axiosInstance.get(`/properties/${id}`),
          axiosInstance.get(`/reviews/${id}`)
        ]);
        setProperty(propRes.data);
        setReviews(revRes.data.reviews);
      } catch (error) {
        console.error("Load error:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);

  const handleBookingChange = (e) => {
    setBookingDates({ ...bookingDates, [e.target.name]: e.target.value });
  };

  const handleBookingSubmit = async (e) => {
    e.preventDefault();
    setBloading(true);
    setBookingMessage('');
    try {
      await axiosInstance.post('/bookings', { propertyId: id, ...bookingDates });
      setBookingMessage("✅ Booking successful!");
    } catch (err) {
      setBookingMessage(err.response?.data?.message || '❌ Booking failed');
    } finally {
      setBloading(false);
    }
  };

  const handleReviewChange = (e) => {
    setReviewForm({ ...reviewForm, [e.target.name]: e.target.value });
  };

  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    setReviewMessage('');
    try {
      const res = await axiosInstance.post(`/reviews/${id}`, reviewForm);
      setReviews(prev => [res.data.review, ...prev]);
      setReviewForm({ rating: 5, comment: '' });
      setReviewMessage('✅ Review submitted!');
    } catch (err) {
      setReviewMessage(err.response?.data?.message || '❌ Review failed');
    }
  };

  if (loading) return <div className="min-h-screen flex items-center justify-center text-xl">Loading...</div>;
  if (!property) return <div className="min-h-screen flex items-center justify-center text-xl">Property not found.</div>;

  return (
    <div className="bg-gradient-to-br from-[#f0f4ff] via-[#fdfdfd] to-[#f0fff7] min-h-screen py-10 px-4">
      <div className="max-w-6xl mx-auto space-y-10">
        {/* Property Image */}
        <div className="rounded-3xl overflow-hidden shadow-2xl border-2 border-white">
          <img src={property.images[0]} alt={property.title} className="w-full h-[450px] object-cover transition-transform duration-300 hover:scale-105" />
        </div>

        {/* Property Info */}
        <div className="bg-white/90 backdrop-blur-md border border-gray-200 rounded-3xl p-8 shadow-xl space-y-4">
          <h1 className="text-4xl font-extrabold text-gray-800">{property.title}</h1>
          <p className="text-lg text-gray-600">{property.location}</p>
          <p className="text-2xl font-bold text-green-600">${property.price} / night</p>
          <p className="text-gray-700">{property.description}</p>
          <Link to={`/properties/${property.id}/edit`} className="text-blue-600 underline hover:text-blue-800 transition">✏️ Edit Listing</Link>
        </div>  

        {/* Booking Form */}
        <form onSubmit={handleBookingSubmit} className="bg-white/90 backdrop-blur-md border border-gray-200 rounded-3xl p-8 shadow-lg space-y-6">
          <h2 className="text-2xl font-semibold text-blue-700">📅 Book This Property</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="date"
              name="startDate"
              value={bookingDates.startDate}
              onChange={handleBookingChange}
              required
              className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
            />
            <input
              type="date"
              name="endDate"
              value={bookingDates.endDate}
              onChange={handleBookingChange}
              required
              className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
            />
          </div>
          <button
            type="submit"
            disabled={bloading}
            className={`w-full md:w-auto px-6 py-3 rounded-xl font-bold text-white bg-blue-600 hover:bg-blue-700 transition ${
              bloading ? 'opacity-60 cursor-not-allowed' : ''
            }`}
          >
            {bloading ? 'Booking...' : 'Confirm Booking'}
          </button>
          {bookingMessage && <p className="text-green-600 font-semibold">{bookingMessage}</p>}
        </form>

        {/* Reviews */}
        <div className="bg-white/90 backdrop-blur-md border border-gray-200 rounded-3xl p-8 shadow-lg space-y-6">
          <h2 className="text-2xl font-semibold text-gray-800">💬 Guest Reviews</h2>

          {reviews.length === 0 ? (
            <p className="text-gray-500 italic">No reviews yet. Be the first!</p>
          ) : (
            <div className="space-y-4">
              {reviews.map((r) => (
                <div key={r.id} className="flex items-start gap-4 bg-gray-50 p-4 rounded-xl border-l-4 border-green-500 shadow">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center font-bold text-green-700">
                    {r.user.name.charAt(0)}
                  </div>
                  <div>
                    <p className="font-semibold text-gray-800">{r.user.name}</p>
                    <p className="text-yellow-600 font-medium">Rating: {r.rating} / 5</p>
                    <p className="text-gray-700">{r.comment}</p>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Review Form */}
          <form onSubmit={handleReviewSubmit} className="space-y-4 border-t pt-6">
            <h3 className="text-lg font-semibold text-gray-700">📝 Leave a Review</h3>
            <select
              name="rating"
              value={reviewForm.rating}
              onChange={handleReviewChange}
              className="w-full border p-3 rounded-lg focus:ring-green-400 outline-none"
            >
              {[1, 2, 3, 4, 5].map(n => <option key={n} value={n}>{n}</option>)}
            </select>
            <textarea
              name="comment"
              value={reviewForm.comment}
              onChange={handleReviewChange}
              rows="4"
              className="w-full border p-3 rounded-lg focus:ring-green-400 outline-none"
              placeholder="Write your experience..."
              required
            />
            <button
              type="submit"
              className="px-6 py-2 bg-green-600 text-white rounded-xl shadow hover:bg-green-700 transition"
            >
              Submit Review
            </button>
            {reviewMessage && <p className="text-green-600 font-medium">{reviewMessage}</p>}
          </form>
        </div>
      </div>
    </div>
  );
};

export default PropertyDetail;
