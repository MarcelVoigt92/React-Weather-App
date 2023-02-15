const API_KEY = process.env.REACT_APP_WEATHER_API_KEY;

async function fetchWeather(city) {
  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`
    );
    const data = await response.json();
    return {
      city: {
        id: data.id,
        name: data.name,
        country: data.sys.country,
        timezoneShift: data.timezone,
        sun: {
          rise: new Date(data.sys.sunrise * 1000),
          set: new Date(data.sys.sunset * 1000),
        },
      },
      temperature: {
        value: (data.main.temp - 273.15).toFixed(1),
        min: (data.main.temp_min - 273.15).toFixed(1),
        max: (data.main.temp_max - 273.15).toFixed(1),
        unit: "Celsius",
      },
      feels_like: {
        value: (data.main.feels_like - 273.15).toFixed(1),
        unit: "Celsius",
      },
      humidity: {
        value: data.main.humidity,
        unit: "%",
      },
      pressure: {
        value: data.main.pressure,
        unit: "hPa",
      },
      wind: {
        speed: {
          value: data.wind.speed,
          unit: "m/s",
          name: "",
        },
        direction: {
          value: data.wind.deg,
          code: "",
          name: "",
        },
      },
      clouds: {
        value: data.clouds.all,
        name: "",
      },
      visibility: {
        value: data.visibility,
      },
      precipitation: {
        value: data.rain ? data.rain["1h"] : data.snow ? data.snow["1h"] : 0,
        mode: data.rain ? "rain" : data.snow ? "snow" : "no",
      },
      weather: {
        number: data.weather[0].id,
        value: data.weather[0].main,
        icon: data.weather[0].icon,
      },
      lastupdate: {
        value: new Date(data.dt * 1000),
      },
    };
  } catch (error) {
    console.error(error);
    return error;
  }
}

export default fetchWeather;
