import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {Link} from "react-router-dom"
import axiosInstance from '../api/axiosInstance';

const PropertyDetail = () => {
  const { id } = useParams();
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);  // Booking state
  
  const [bloading, setBloading] = useState(false);  // Booking state

  
  const [bookingDates, setBookingDates] = useState({ startDate: '', endDate: '' });
  const [bookingMessage, setBookingMessage] = useState('');

  // Reviews state
  const [reviews, setReviews] = useState([]);
  const [reviewForm, setReviewForm] = useState({ rating: 5, comment: '' });
  const [reviewMessage, setReviewMessage] = useState('');

  // Fetch property and reviews
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
        console.error('Load error:', error);
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
    setBloading(true);
    e.preventDefault();
    setBookingMessage('');
    try {
      await axiosInstance.post('/bookings', { propertyId: id, ...bookingDates });
      setBookingMessage('Booking successful!');
    } catch (err) {
      console.error('Booking error:', err.response?.data || err);
      setBookingMessage(err.response?.data?.message || 'Booking failed');
x    }
    finally{
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
      setReviewMessage('Review submitted!');
    } catch (err) {
      console.error('Review error:', err.response?.data || err);
      setReviewMessage(err.response?.data?.message || 'Review failed');
    }
  };

  if (loading) return <p>Loading...</p>;
  if (!property) return <p>Property not found.</p>;

  return (
    <div className="p-6 md:p-10 bg-gradient-to-br from-gray-50 to-gray-200 min-h-screen">
      <div className="max-w-5xl mx-auto space-y-8">
        {/* Property Image */}
        <div className="rounded-2xl overflow-hidden shadow-lg">
          <img
            src={property.images[0]}
            alt={property.title}
            className="w-full h-80 object-cover"
          />
        </div>
  
        {/* Property Info */}
        <div className="bg-white p-6 rounded-xl shadow-md space-y-2">
          <h1 className="text-4xl font-bold text-gray-800">{property.title}</h1>
          <p className="text-lg text-gray-600">{property.location}</p>
          <p className="text-2xl font-semibold text-green-700">${property.price} / night</p>
          <p className="text-gray-700">{property.description}</p>
        <Link to={`/properties/${property.id}/edit`}>Edit Listing</Link>
        </div>


  
        {/* Booking Form */}
        <form onSubmit={handleBookingSubmit} className="bg-white p-6 rounded-xl shadow-md space-y-6">
          <h2 className="text-2xl font-semibold text-blue-700">Book This Property</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block mb-1 font-medium text-gray-700">Start Date</label>
              <input
                type="date"
                name="startDate"
                value={bookingDates.startDate}
                onChange={handleBookingChange}
                required
                className="w-full border border-gray-300 p-2 rounded focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="block mb-1 font-medium text-gray-700">End Date</label>
              <input
                type="date"
                name="endDate"
                value={bookingDates.endDate}
                onChange={handleBookingChange}
                required
                className="w-full border border-gray-300 p-2 rounded focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>
          </div>
          <button
            type="submit"
            disabled={bloading}
            className={`w-full md:w-auto bg-blue-600 text-white font-semibold px-6 py-2 rounded-lg shadow hover:bg-blue-700 transition-all duration-200 ${
              bloading ? 'opacity-60 cursor-not-allowed' : ''
            }`}
          >
            {bloading ? 'Booking...' : 'Confirm Booking'}
          </button>
          {bloading && <p className="text-blue-500 mt-2">Booking in progress...</p>}
          {bookingMessage && <p className="text-green-600 mt-2 font-medium">{bookingMessage}</p>}
        </form>
  
        {/* Reviews */}
        <div className="bg-white p-6 rounded-xl shadow-md space-y-6">
          <h2 className="text-2xl font-semibold text-gray-800">Guest Reviews</h2>
  
          {reviews.length === 0 ? (
            <p className="text-gray-500 italic">No reviews yet. Be the first!</p>
          ) : (
            <div className="space-y-4">
              {reviews.map((r) => (
                <div
                  key={r.id}
                  className="border-l-4 border-green-500 pl-4 bg-gray-50 p-3 rounded shadow-sm"
                >
                  <p className="text-lg font-semibold text-gray-800">{r.user.name}</p>
                  <p className="text-yellow-600 font-medium">Rating: {r.rating} / 5</p>
                  <p className="text-gray-700 mt-1">{r.comment}</p>
                </div>
              ))}
            </div>
          )}
  
          {/* Review Form */}
          <form onSubmit={handleReviewSubmit} className="space-y-4 pt-4 border-t">
            <h3 className="text-lg font-medium text-gray-700">Leave a Review</h3>
            <div>
              <label className="block mb-1 font-medium text-gray-700">Rating</label>
              <select
                name="rating"
                value={reviewForm.rating}
                onChange={handleReviewChange}
                className="border p-2 rounded w-full focus:ring-green-500 focus:outline-none"
              >
                {[1, 2, 3, 4, 5].map((n) => (
                  <option key={n} value={n}>{n}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block mb-1 font-medium text-gray-700">Comment</label>
              <textarea
                name="comment"
                value={reviewForm.comment}
                onChange={handleReviewChange}
                className="w-full border p-3 rounded focus:ring-green-500 focus:outline-none"
                required
                rows="3"
              />
            </div>
            <button
              type="submit"
              className="bg-green-600 text-white px-6 py-2 rounded shadow hover:bg-green-700 transition-all"
            >
              Submit Review
            </button>
            {reviewMessage && <p className="text-green-600 mt-2 font-medium">{reviewMessage}</p>}
          </form>
        </div>
      </div>
    </div>
  );
}
  
export default PropertyDetail;
