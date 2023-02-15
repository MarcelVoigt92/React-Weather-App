import { useState } from "react";
import fetchWeather from "../hooks/fetchWeatherData";
import "./WeatherApp.css";

function WeatherDisplay() {
  const [city, setCity] = useState("");
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!city) {
      setError("Please enter a city name.");
      setWeatherData(null);
      return;
    }
    try {
      const data = await fetchWeather(city);
      setWeatherData(data);
      setError(null);
    } catch (error) {
      setWeatherData(null);
      setError(error.message);
    }
  };

  const handleInputChange = (event) => {
    setCity(event.target.value);
  };

  const renderIcon = (icon) => {
    const url = `http://openweathermap.org/img/w/${icon}.png`;
    return <img src={url} alt="weather icon" />;
  };

  return (
    <div>
      <form className="form" onSubmit={handleSubmit}>
        <label>
          City:
          <input type="text" value={city} onChange={handleInputChange} />
        </label>
        <button type="submit">Fetch Weather</button>
      </form>
      {error && <div>Error: {error}</div>}
      {weatherData && weatherData.city?.name && (
        <div className="weather">
          <h2>
            {weatherData.city.name}, {weatherData.city.country}
          </h2>
          <p>
            Temperature: {weatherData.temperature.value} °C (min:{" "}
            {weatherData.temperature.min} °C, max: {weatherData.temperature.max}{" "}
            °C)
          </p>
          <p>Feels like: {weatherData.feels_like.value} °C</p>
          <p>Humidity: {weatherData.humidity.value} %</p>
          <p>Pressure: {weatherData.pressure.value} hPa</p>
          <p>
            Wind: {weatherData.wind.speed.value} {weatherData.wind.speed.unit}
          </p>
          <p>Clouds: {weatherData.clouds.value} %</p>
          <p>Visibility: {weatherData.visibility.value} m</p>
          <p>
            Precipitation: {weatherData.precipitation.value} mm (
            {weatherData.precipitation.mode})
          </p>
          <p>
            Weather: {weatherData.weather.value}{" "}
            {renderIcon(weatherData.weather.icon)}
          </p>
          <p>Last updated: {weatherData.lastupdate.value.toLocaleString()}</p>
        </div>
      )}
    </div>
  );
}

export default WeatherDisplay;
