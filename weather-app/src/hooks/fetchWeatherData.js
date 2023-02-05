const API_KEY = process.env.REACT_APP_WEATHER_API_KEY;

async function fetchWeather(city) {
  try {
    const response = await fetch(
      `https://weatherapi-com.p.rapidapi.com/current.json?q=${city}`,
      {
        headers: {
          "X-RapidAPI-Key": API_KEY,
          "X-RapidAPI-Host": "weatherapi-com.p.rapidapi.com",
        },
      }
    );
    const data = await response.json();
    return {
      name: data.location.name,
      region: data.location.region,
      country: data.location.country,
      temp_c: data.current.temp_c,
      wind_kph: data.current.wind_kph,
      humidity: data.current.humidity,
    };
  } catch (error) {
    console.error(error);
    return error;
  }
}

export default fetchWeather;
