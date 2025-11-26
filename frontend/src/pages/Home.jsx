import { useState } from "react";
import axios from "axios";

export default function Home() {
  const [url, setUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleShorten() {
    setLoading(true);
    setShortUrl("");

    try {
      const res = await axios.post("http://localhost:5000/api/url/shorten", {
        originalUrl: url,
      });
      setShortUrl(`http://localhost:5000/${res.data.shortId}`);
    } catch (err) {
      console.error(err);
      alert("Error shortening URL");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
      <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4 text-center">🔗 Tiny Link</h2>

        <input
          type="text"
          placeholder="Enter URL"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          className="w-full border border-gray-300 rounded px-3 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />

        <button
          onClick={handleShorten}
          disabled={loading}
          className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded disabled:opacity-50 mb-4"
        >
          {loading ? "Shortening..." : "Shorten"}
        </button>

        {loading && (
          <p className="text-gray-500 text-center mb-2">⏳ Please wait...</p>
        )}

        {shortUrl && !loading && (
          <p className="bg-green-100 border border-green-300 text-green-700 p-3 rounded text-center break-all">
            Your Short URL:{" "}
            <a href={shortUrl} target="_blank" className="underline">
              {shortUrl}
            </a>
          </p>
        )}
      </div>
    </div>
  );
}
