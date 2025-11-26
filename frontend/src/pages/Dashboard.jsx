import { useEffect, useState } from "react";
import axios from "axios";
import UrlCard from "../components/UrlCard";

export default function Dashboard() {
  const [urls, setUrls] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchUrls = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/url/list");
      setUrls(res.data);
    } catch (err) {
      console.error(err);
      alert("Error fetching URLs");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUrls();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-2xl font-bold mb-4 text-center">Your Shortened URLs</h2>

        {loading && <p className="text-center text-gray-500">⏳ Loading URLs...</p>}

        {!loading && urls.length === 0 && (
          <p className="text-center text-gray-500">No URLs created yet.</p>
        )}

        <div className="space-y-4">
          {urls.map((url) => (
            <UrlCard key={url.id} url={url} />
          ))}
        </div>
      </div>
    </div>
  );
} 