import { useEffect, useState } from "react";
import SearchBar from "./components/SearchBar";
import Weather from "./components/Weather";
import axios from "axios";
// import searchWeather from "./searchWeather";

function App() {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    document.addEventListener("contextmenu", (event) => {
      event.preventDefault();
    });

    axios
      .get(`${import.meta.env.VITE_REACT_SERVER_URL}/forecast.json`, {
        params: {
          key: import.meta.env.VITE_REACT_API_KEY,
          q: "Kathmandu",
          days: 3,
          aqi: "yes",
        },
      })
      .then((res) => {
        setData(res.data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {});
  }, []);

  const fetchData = (lat, lon) => {
    axios
      .get(`${import.meta.env.VITE_REACT_SERVER_URL}/forecast.json`, {
        params: {
          key: import.meta.env.VITE_REACT_API_KEY,
          q: `${lat},${lon}`,
          days: 3,
          aqi: "yes",
        },
      })
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => {
        console.log(err.response.status);
      });
  };

  return (
    <>
      <h1 style={{ textAlign: "center", marginTop: "14px" }}>Weather App</h1>
      <SearchBar fetchData={fetchData} />
      {isLoading && <h1 style={{ textAlign: "center" }}>Loading...</h1>}
      {!isLoading && <Weather data={data} />}
    </>
  );
}

export default App;
