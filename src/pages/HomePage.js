import React, { useEffect, useState } from "react";
import { fetchSeminars, addBookmark, fetchBookmarks, fetchBookmarkDetails } from "../utils/api";

const HomePage = () => {
  const [seminars, setSeminars] = useState([]);
  const [bookmarks, setBookmarks] = useState([]);
  const [filter, setFilter] = useState("");
  const [selectedSeminar, setSelectedSeminar] = useState(null);

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
    if (!bookmarks.some((b) => b.id === id)) {
      await addBookmark(id);
      const updatedBookmarks = await fetchBookmarks();
      setBookmarks(updatedBookmarks);
    }
  };

  const handleViewDetail = async (id) => {
    const detail = await fetchBookmarkDetails(id);
    setSelectedSeminar(detail);
  };

  const handleCloseDetail = () => {
    setSelectedSeminar(null);
  };

  const filteredSeminars = filter
    ? seminars.filter((seminar) => seminar.location === filter)
    : seminars;

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      {/* Konten utama */}
      <main className="flex-grow p-6">
        <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">
          Info Seminar!
        </h1>
        <select
          className="border p-2 rounded mb-6 w-full max-w-xs mx-auto block"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        >
          <option value="">Semua Lokasi</option>
          <option value="Jakarta">Jakarta</option>
          <option value="Bandung">Bandung</option>
          <option value="Surabaya">Surabaya</option>
        </select>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredSeminars.map((seminar) => (
            <div
              key={seminar.id}
              className="bg-white border rounded-lg shadow-lg overflow-hidden"
            >
              <img
                src={seminar.image}
                alt={seminar.title}
                className="w-full h-60 object-contain bg-gray-50"
              />
              <div className="p-4">
                <h2 className="text-xl font-semibold mb-2 text-gray-700">
                  {seminar.title}
                </h2>
                <p className="text-gray-600 mb-4">{seminar.location}</p>
                <div className="flex justify-between">
                  <button
                    onClick={() => handleBookmark(seminar.id)}
                    className={`px-4 py-2 rounded ${
                      bookmarks.some((b) => b.id === seminar.id)
                        ? "bg-gray-400 text-white cursor-not-allowed"
                        : "bg-blue-500 text-white hover:bg-blue-600"
                    }`}
                    disabled={bookmarks.some((b) => b.id === seminar.id)}
                  >
                    {bookmarks.some((b) => b.id === seminar.id)
                      ? "Bookmarked"
                      : "Bookmark"}
                  </button>
                  <button
                    onClick={() => handleViewDetail(seminar.id)}
                    className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                  >
                    View Detail
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
        {selectedSeminar && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white p-6 rounded shadow-lg w-96">
              <h2 className="text-xl font-bold mb-4">{selectedSeminar.title}</h2>
              <p>
                <strong>Location:</strong> {selectedSeminar.location}
              </p>
              <p>
                <strong>Time:</strong> {selectedSeminar.time || "TBD"}
              </p>
              <p>
                <strong>Speaker:</strong> {selectedSeminar.speaker || "TBD"}
              </p>
              <button
                onClick={handleCloseDetail}
                className="mt-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
              >
                Close
              </button>
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-4 text-center">
        <p className="text-sm">
          © {new Date().getFullYear()} InfoSeminarHub. All rights reserved.
        </p>
      </footer>
    </div>
  );
};

export default HomePage;
