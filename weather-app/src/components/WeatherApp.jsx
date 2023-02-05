import React, { useState } from "react";
import fetchWeather from "../hooks/fetchWeatherData";
import { MdDarkMode } from "react-icons/md";
import "../styles/WeatherApp.css";

function WeatherApp() {
  const [location, setLocation] = useState("");
  const [weatherData, setWeatherData] = useState({});
  const [error, setError] = useState("");
  const [isDarkMode, setIsDarkMode] = useState(false);

  const handleChange = (event) => {
    setLocation(event.target.value);
  };

  const handleDarkModeToggle = () => {
    setIsDarkMode(!isDarkMode);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    setWeatherData({});

    try {
      const data = await fetchWeather(location);
      if (data.error) {
        setError(data.error.message);
      } else {
        setWeatherData(data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className={`weather-app ${isDarkMode ? "dark" : "light"}`}>
      <h1 className=".weather-app-title ">Weather App</h1>
      <form className="weather-app-form" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter a location"
          value={location}
          onChange={handleChange}
          className="weather-app-input"
        />
        <button className="weather-app-button" type="submit">
          Search
        </button>
      </form>
      {error && <div className="error">{error}</div>}
      {weatherData.name && (
        <div className="weather-data">
          <div className="weather-app-info">
            Location: {weatherData.name} <br /> {weatherData.region},
            <br />
            {weatherData.country}
          </div>
          <div className="weather-app-info">
            Temperature: {weatherData.temp_c}°C
          </div>
          <div className="weather-app-info">
            Wind: {weatherData.wind_kph} kph
          </div>
          <div className="weather-app-info">
            Humidity: {weatherData.humidity}%
          </div>
        </div>
      )}
      <button className="dark-mode-toggle" onClick={handleDarkModeToggle}>
        {isDarkMode ? "Light Mode" : "Dark Mode"}
      </button>
    </div>
  );
}

export default WeatherApp;
