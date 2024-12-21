import React from 'react';

const SeminarCard = ({ seminar, onBookmark, isBookmarked }) => {
  return (
    <div className="border p-4 rounded shadow-md">
      <img src={seminar.image} alt={seminar.title} className="w-full h-32 object-cover rounded" />
      <h2 className="text-lg font-bold mt-2">{seminar.title}</h2>
      <p>{seminar.date} - {seminar.location}</p>
      <button
        className={`mt-2 p-2 rounded ${isBookmarked ? 'bg-gray-400' : 'bg-blue-600 text-white'}`}
        onClick={() => !isBookmarked && onBookmark(seminar.id)}
        disabled={isBookmarked}
      >
        {isBookmarked ? 'Bookmarked' : 'Bookmark'}
      </button>
      <button className="mt-2 p-2 bg-green-600 text-white rounded">View Details</button>
    </div>
  );
};

export default SeminarCard;