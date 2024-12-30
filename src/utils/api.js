const apiUrl = "http://localhost:5000";

export const fetchSeminars = async () => {
  const response = await fetch(`${apiUrl}/seminars`);
  if (!response.ok) {
    throw new Error("Failed to fetch seminars");
  }
  return await response.json();
};

export const fetchBookmarks = async () => {
  const response = await fetch(`${apiUrl}/bookmarks`);
  if (!response.ok) {
    throw new Error("Failed to fetch bookmarks");
  }
  return await response.json();
};

export const addBookmark = async (seminarId) => {
  // Ambil detail seminar berdasarkan ID
  const seminarDetailsResponse = await fetch(`${apiUrl}/seminars/${seminarId}`);
  if (!seminarDetailsResponse.ok) {
    throw new Error("Failed to fetch seminar details");
  }
  const seminarDetails = await seminarDetailsResponse.json();

  // Kirim seminarDetails ke endpoint /bookmarks
  const response = await fetch(`${apiUrl}/bookmarks`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(seminarDetails), // Kirim data lengkap seminar
  });

  if (!response.ok) {
    throw new Error("Failed to add bookmark");
  }
  return await response.json();
};

export const removeBookmark = async (seminarId) => {
  const response = await fetch(`${apiUrl}/bookmarks/${seminarId}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    throw new Error("Failed to remove bookmark");
  }
  return await response.json(); 
};

/**
 * Mengambil detail seminar berdasarkan ID.
 * @param {string} seminarId
 * @returns {Promise<object>}
 */
export const fetchBookmarkDetails = async (seminarId) => {
  const response = await fetch(`${apiUrl}/seminars/${seminarId}`);
  if (!response.ok) {
    throw new Error("Failed to fetch seminar details");
  }
  return await response.json();
};
