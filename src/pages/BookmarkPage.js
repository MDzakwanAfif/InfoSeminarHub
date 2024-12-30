import React, { useEffect, useState } from "react";
import { fetchBookmarks, fetchBookmarkDetails, removeBookmark } from "../utils/api";

const BookmarkPage = () => {
  const [bookmarks, setBookmarks] = useState([]);
  const [details, setDetails] = useState(null);

  useEffect(() => {
    const loadBookmarks = async () => {
      const bookmarkData = await fetchBookmarks();
      setBookmarks(bookmarkData);
    };
    loadBookmarks();
  }, []);

  const handleRemoveBookmark = async (id) => {
    await removeBookmark(id);
    const updatedBookmarks = await fetchBookmarks();
    setBookmarks(updatedBookmarks);
    setDetails(null);
  };

  const handleViewDetails = async (id) => {
    const seminarDetails = await fetchBookmarkDetails(id);
    setDetails(seminarDetails);
  };

  const closeDetails = () => {
    setDetails(null);
  };

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Favorit Anda</h1>
      {bookmarks.length === 0 ? (
        <p>Tidak ada seminar yang di-bookmark.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {bookmarks.map((bookmark) => (
            <div key={bookmark.id} className="border p-4 rounded shadow">
              <img
                src={bookmark.image}
                alt={bookmark.title}
                className="w-full h-48 object-cover rounded mb-4"
              />
              <h2 className="text-lg font-bold">{bookmark.title}</h2>
              <p>{bookmark.location}</p>
              <div className="flex justify-between items-center mt-2">
              <button
                onClick={() => handleRemoveBookmark(bookmark.id)}
                className="mt-2 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
              >
                Hapus Bookmark
              </button>
              <button
                  onClick={() => handleViewDetails(bookmark.id)}
                  className={`px-4 py-2 ${
                    details && details.id === bookmark.id
                      ? "bg-gray-500"
                      : "bg-blue-500 hover:bg-blue-600"
                  } text-white rounded`}
                >
                  View Details
                </button>
            </div>
            </div>
          ))}
        </div>
      )}
      {details && (
        <div className="mt-6 p-4 border rounded shadow bg-gray-100">
          <h3 className="text-lg font-bold mb-2">Detail Seminar</h3>
          <p><strong>Judul:</strong> {details.title}</p>
          <p><strong>Mode:</strong> {details.mode}</p>
          <p><strong>Waktu:</strong> {details.time}</p>
          <p><strong>Pemateri:</strong> {details.speaker}</p>
          <button
            onClick={closeDetails}
            className="mt-4 px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
          >
            Tutup
          </button>
        </div>
      )}
    </div>
  );
};

export default BookmarkPage;
