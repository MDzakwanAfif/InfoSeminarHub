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
  const response = await fetch(`${apiUrl}/bookmarks`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ id: seminarId }), // Sesuaikan dengan format yang diterima oleh server
  });

  if (!response.ok) {
    throw new Error("Failed to add bookmark");
  }
  return await response.json(); // Opsional: jika server mengembalikan data terbaru
};

export const removeBookmark = async (seminarId) => {
  const response = await fetch(`${apiUrl}/bookmarks/${seminarId}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    throw new Error("Failed to remove bookmark");
  }
  return await response.json(); // Opsional: jika server mengembalikan data terbaru
};
