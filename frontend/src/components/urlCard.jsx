export default function UrlCard({ url }) {
  return (
    <div className="bg-white shadow rounded-lg p-4 border border-gray-200">
      <p>
        <strong>Original:</strong> {url.original_url}
      </p>
      <p>
        <strong>Short:</strong>{" "}
        <a
          href={`${import.meta.env.VITE_API_URL}/${url.short_id}`}
          target="_blank"
          className="text-blue-500 underline"
        >
          {`${import.meta.env.VITE_API_URL}/${url.short_id}`}
        </a>
      </p>
      <p>🧮 Clicks: {url.clicks}</p>
    </div>
  );
}
