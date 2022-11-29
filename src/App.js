import { useState } from "react";
import { dateBuilder } from "./helpers/dateBuilder";

function App() {
  // STATES

  const [inputValue, setInputValue] = useState("");
  const [weatherData, setWeatherData] = useState([]);

  // OpenWeather API KEY + URL

  const API_KEY = "0bfcb686dc161a3f27ddc42c3ac6b6f7";
  const BASE_API_URL = `https://api.openweathermap.org/data/2.5/weather?q=${inputValue}&appid=${API_KEY}&units=metric`;

  // GETTING THE DATA FROM API

  const fetchData = async (e) => {
    if (e.key == "Enter") {
      const response = await fetch(BASE_API_URL);
      const data = await response.json();

      setWeatherData(data);
      setInputValue("");
    }
  };

  return (
    <div className="App">
      <header>
        <h1 className="text-white pt-4">WeatherApp</h1>
        <input
          className="search-bar mt-3"
          type="search"
          placeholder="Enter location..."
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyPress={fetchData}
        />
      </header>
      <main>
        {weatherData.cod == "404" ? (
          <p className="text-white mt-5">City or Country not found...</p>
        ) : (
          <div className="weather-details mt-4">
            {weatherData.main && (
              <div className="weather-details-top text-white mt-3">
                <h2>
                  {weatherData.name} - {weatherData.sys.country}
                </h2>
                <p className="pt-2">{dateBuilder(new Date())}</p>
                <p>{Math.floor(weatherData.main.temp)}&#176; C </p>
                <p>{weatherData.weather[0].main}</p>
              </div>
            )}
            {weatherData.name !== undefined && (
              <div className="weather-details-bottom text-white">
                <p>
                  Fells Like: {Math.floor(weatherData.main.feels_like)}&#176; C
                </p>
                <p>Humidity: {weatherData.main.humidity}</p>
                <p>Wind: {weatherData.wind.speed}</p>
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
}

export default App;
