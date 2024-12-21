import React from "react";
import { useParams } from "react-router-dom";

const SeminarDetail = ({ seminars }) => {
  const { id } = useParams();
  const seminar = seminars.find((s) => s.id === Number(id));

  if (!seminar) return <p>Seminar not found.</p>;

  return (
    <div className="container mx-auto mt-8">
      <img src={seminar.image} alt={seminar.title} className="w-full h-64 object-cover mb-4" />
      <h1 className="text-2xl font-bold">{seminar.title}</h1>
      <p>Date: {seminar.date}</p>
      <p>Location: {seminar.location}</p>
    </div>
  );
};

export default SeminarDetail;
