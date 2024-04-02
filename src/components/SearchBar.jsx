import { useState, useEffect } from "react";
import axios from "axios";
import CityList from "./CityList";
import Spinner from "./Spinner";
import "./SearchBar.css";

function SearchBar({ fetchData }) {
  const [cityList, setCityList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [cityName, setCityName] = useState("");

  useEffect(() => {
    if (cityName.length > 2) {
      const timer = setTimeout(() => {
        setIsLoading(true);
        axios
          .get(`${import.meta.env.VITE_REACT_SERVER_URL}/search.json`, {
            params: {
              key: import.meta.env.VITE_REACT_API_KEY,
              q: cityName,
            },
          })
          .then((res) => {
            setCityList(res.data);
          })
          .catch((err) => {
            console.log(err);
          })
          .finally(() => {
            setIsLoading(false);
          });
      }, 500);

      return () => clearTimeout(timer);
    } else {
      setCityList([]);
    }
  }, [cityName]);

  const handleChange = (event) => {
    setCityName(event.target.value);
  };

  return (
    <div className="search-container">
      <div className="search-bar">
        <input
          type="text"
          value={cityName}
          placeholder="Enter city name..."
          onChange={handleChange}
        />
        {isLoading && (
          <div className="loader">
            <Spinner />
          </div>
        )}
        {!isLoading && (
          <CityList
            cityList={cityList}
            setCityName={setCityName}
            fetchData={fetchData}
          />
        )}
      </div>
    </div>
  );
}

export default SearchBar;
