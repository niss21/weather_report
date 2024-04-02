import City from "./City";
import "./CityList.css";

function CityList({ cityList, setCityName, fetchData }) {
  const renderList = cityList.map((city) => {
    return (
      <City
        city={city}
        setCityName={setCityName}
        fetchData={fetchData}
        key={city.id}
      />
    );
  });
  return <ul className="cityList">{renderList}</ul>;
}

export default CityList;
