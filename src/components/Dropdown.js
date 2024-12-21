const Dropdown = ({ locations, onSelect }) => {
  return (
    <select className="border p-2 rounded" onChange={(e) => onSelect(e.target.value)}>
      <option value="">All Locations</option>
      {locations.map((location, index) => (
        <option key={index} value={location}>
          {location}
        </option>
      ))}
    </select>
  );
};

export default Dropdown;