import React, { useEffect, useState } from "react";
import { fetchSeminars, addBookmark, fetchBookmarks } from "../utils/api";

const HomePage = () => {
  const [seminars, setSeminars] = useState([]);
  const [bookmarks, setBookmarks] = useState([]);
  const [filter, setFilter] = useState("");

  useEffect(() => {
    
    const loadData = async () => {
      const seminarData = await fetchSeminars();
      const bookmarkData = await fetchBookmarks();
      setSeminars(seminarData);
      setBookmarks(bookmarkData);
    };
    loadData();
  }, []);

  const handleBookmark = async (id) => {
    // Jika seminar belum di-bookmark, tambahkan ke bookmark
    if (!bookmarks.some((b) => b.id === id)) {
      await addBookmark(id); // Tambahkan bookmark melalui API
      const updatedBookmarks = await fetchBookmarks(); // Ambil data bookmark terbaru
      setBookmarks(updatedBookmarks); // Perbarui state bookmark
    }
  };

  const filteredSeminars = filter
    ? seminars.filter((seminar) => seminar.location === filter)
    : seminars;

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Home Page</h1>
      <select
        className="border p-2 rounded mb-4"
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
      >
        <option value="">Semua Lokasi</option>
        <option value="Jakarta">Jakarta</option>
        <option value="Bandung">Bandung</option>
        <option value="Surabaya">Surabaya</option>
      </select>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredSeminars.map((seminar) => (
          <div key={seminar.id} className="border p-4 rounded shadow">
            <img
              src={seminar.image}
              alt={seminar.title}
              className="w-full h-48 object-cover rounded mb-4"
            />
            <h2 className="text-lg font-bold">{seminar.title}</h2>
            <p>{seminar.location}</p>
            <button
              onClick={() => handleBookmark(seminar.id)}
              className={`mt-2 px-4 py-2 rounded ${
                bookmarks.some((b) => b.id === seminar.id)
                  ? "bg-gray-400 text-white cursor-not-allowed"
                  : "bg-blue-500 text-white hover:bg-blue-600"
              }`}
              disabled={bookmarks.some((b) => b.id === seminar.id)} // Nonaktifkan tombol jika sudah di-bookmark
            >
              {bookmarks.some((b) => b.id === seminar.id) ? "Bookmarked" : "Bookmark"}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomePage;
