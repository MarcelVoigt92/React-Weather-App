import React, { useState, useEffect } from "react";
import fetchWeather from "../hooks/fetchWeatherData";
import "../styles/WeatherApp.css";

const WeatherApp = () => {
  const [location, setLocation] = useState("");
  const [weatherData, setWeatherData] = useState({});
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      if (!location) return;

      const data = await fetchWeather(location);
      if (data.error) {
        setError(data.error.message);
      } else {
        setWeatherData(data);
      }
    };

    fetchData();
  }, [location]);

  const handleSubmit = (event) => {
    event.preventDefault();
    setLocation(event.target.elements.location.value);
    setWeatherData({});
    setError("");
  };

  return (
    <div className="WeatherApp">
      <h1 className="WeatherApp-title">Weather App</h1>
      <form className="WeatherApp-form" onSubmit={handleSubmit}>
        <input
          className="WeatherApp-input"
          type="text"
          placeholder="Enter city name"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />
        <button className="WeatherApp-button" type="submit">
          Search
        </button>
      </form>
      {/* {error && <div className="WeatherApp-error">{error}</div>} */}
      {weatherData.location && (
        <div className="WeatherApp-info">
          <p>
            Location: {weatherData.location.name},{" "}
            {weatherData.location.country}
          </p>
          <p>Temperature: {weatherData.current.temp_c}°C</p>
          <p>Conditions: {weatherData.current.condition.text}</p>
        </div>
      )}
    </div>
  );
};

export default WeatherApp;
