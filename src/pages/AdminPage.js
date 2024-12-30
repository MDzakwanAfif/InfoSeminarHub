import React, { useState, useEffect } from "react";

const AdminPage = () => {
  const [formData, setFormData] = useState({
    id: "",
    title: "",
    description: "",
    location: "",
    time: "",
    speaker: "",
    image: "",
    bookmarked: false,
  });

  const [seminars, setSeminars] = useState([]);

  const fetchSeminars = async () => {
    try {
      const response = await fetch("http://localhost:5000/seminars");
      const data = await response.json();
      setSeminars(data);
    } catch (error) {
      console.error("Error fetching seminars:", error);
    }
  };

  useEffect(() => {
    fetchSeminars();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const id = formData.id || crypto.randomUUID(); 
    const seminarData = {
      ...formData,
      id,
      bookmarked: false,
    };

    try {
      const response = await fetch("http://localhost:5000/seminars", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(seminarData),
      });

      if (response.ok) {
        alert("Seminar added successfully!");
        setFormData({
          id: "",
          title: "",
          description: "",
          location: "",
          time: "",
          speaker: "",
          image: "",
          bookmarked: false,
        });
        fetchSeminars();
      } else {
        alert("Failed to add seminar.");
      }
    } catch (error) {
      console.error("Error adding seminar:", error);
      alert("Error adding seminar.");
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://localhost:5000/seminars/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        alert("Seminar deleted successfully!");
        fetchSeminars();
      } else {
        alert("Failed to delete seminar.");
      }
    } catch (error) {
      console.error("Error deleting seminar:", error);
      alert("Error deleting seminar.");
    }
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Admin Page</h1>

      {/* Form untuk menambahkan seminar */}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block font-medium mb-1">ID</label>
          <input
            type="text"
            name="id"
            value={formData.id}
            onChange={handleChange}
            className="border border-gray-300 p-2 w-full rounded"
            placeholder="Generate automatically if left blank"
          />
        </div>
        <div>
          <label className="block font-medium mb-1">Title</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="border border-gray-300 p-2 w-full rounded"
            required
          />
        </div>
        <div>
          <label className="block font-medium mb-1">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="border border-gray-300 p-2 w-full rounded"
            required
          />
        </div>
        <div>
          <label className="block font-medium mb-1">Location</label>
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
            className="border border-gray-300 p-2 w-full rounded"
            required
          />
        </div>
        <div>
          <label className="block font-medium mb-1">Time</label>
          <input
            type="text"
            name="time"
            value={formData.time}
            onChange={handleChange}
            className="border border-gray-300 p-2 w-full rounded"
            required
          />
        </div>
        <div>
          <label className="block font-medium mb-1">Speaker</label>
          <input
            type="text"
            name="speaker"
            value={formData.speaker}
            onChange={handleChange}
            className="border border-gray-300 p-2 w-full rounded"
            required
          />
        </div>
        <div>
          <label className="block font-medium mb-1">Image URL</label>
          <input
            type="text"
            name="image"
            value={formData.image}
            onChange={handleChange}
            className="border border-gray-300 p-2 w-full rounded"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Add Seminar
        </button>
      </form>

      {/* Daftar seminar */}
      <h2 className="text-xl font-bold mt-8">List of Seminars</h2>
      <ul className="space-y-4 mt-4">
        {seminars.map((seminar) => (
          <li
            key={seminar.id}
            className="border border-gray-300 p-4 rounded flex justify-between items-center"
          >
            <div>
              <h3 className="text-lg font-bold">{seminar.title}</h3>
              <p>{seminar.description}</p>
              <p className="text-sm text-gray-500">Location: {seminar.location}</p>
              <p className="text-sm text-gray-500">Time: {seminar.time}</p>
            </div>
            <button
              onClick={() => handleDelete(seminar.id)}
              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminPage;
