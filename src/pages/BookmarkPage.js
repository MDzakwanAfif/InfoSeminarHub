import React, { useEffect, useState } from "react";
import { fetchBookmarks, removeBookmark } from "../utils/api";

const BookmarkPage = () => {
  const [bookmarks, setBookmarks] = useState([]);

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
  };

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Bookmark Page</h1>
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
              <button
                onClick={() => handleRemoveBookmark(bookmark.id)}
                className="mt-2 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
              >
                Hapus Bookmark
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default BookmarkPage;
