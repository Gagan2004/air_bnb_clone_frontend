import AISearch from '../components/AISearch';

function ListingsPage() {
  const [listings, setListings] = useState([]);

  return (
    <div>
      <AISearch onResults={setListings} />
      {/* Render your listings here */}
    </div>
  );
}
