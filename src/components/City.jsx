import "./City.css";

function City({ city, setCityName, fetchData }) {
  const handleClick = () => {
    fetchData(city.lat, city.lon);
    setCityName("");
  };

  return (
    <li className="city" onClick={handleClick}>
      {city.name}, {city.country}
    </li>
  );
}

export default City;
