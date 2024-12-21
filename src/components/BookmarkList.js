import React from "react";

const BookmarkList = ({ bookmarks, onRemoveBookmark }) => {
  if (bookmarks.length === 0) {
    return <p>No bookmarked seminars.</p>;
  }

  return (
    <div>
      {bookmarks.map((bookmark) => (
        <div key={bookmark.id} className="border p-4 rounded shadow mb-3">
          <h2 className="text-lg font-bold">{bookmark.title}</h2>
          <p>{bookmark.description}</p>
          <button
            className="mt-2 bg-red-600 text-white py-1 px-3 rounded"
            onClick={() => onRemoveBookmark(bookmark.id)}
          >
            Remove Bookmark
          </button>
        </div>
      ))}
    </div>
  );
};

export default BookmarkList;
