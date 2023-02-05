import React, { useState } from "react";
import fetchWeather from "../hooks/fetchWeatherData";
import { MdDarkMode } from "react-icons/md";
import "../styles/WeatherApp.css";
import TypeWriter from "./TypeWriter";

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
      <TypeWriter />
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
          <div className="weather-app-info" data-label="Name">
            {weatherData.name}, {weatherData.region}, {weatherData.country}
          </div>
          <div className="weather-app-info" data-label="Temperature">
            {weatherData.temp_c}°C, {weatherData.temp_f}°F
          </div>
          <div className="weather-app-info" data-label="Wind">
            {weatherData.wind_kph} kph
          </div>
          <div className="weather-app-info" data-label="Humidity">
            {weatherData.humidity}%
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
