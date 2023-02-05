// const API_KEY = process.env.REACT_APP_WEATHER_API_KEY;
// const API_HOST = "https://weatherapi-com.p.rapidapi.com";

async function fetchWeather(city) {
  try {
    const response = await fetch(
      `https://weatherapi-com.p.rapidapi.com/current.json?q=${city}`,
      {
        headers: {
          "X-RapidAPI-Key":
            "f6a139434dmshc294922aabbec71p1a096cjsn728c25b19f4a",
          "X-RapidAPI-Host": "weatherapi-com.p.rapidapi.com",
        },
      }
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    return error;
  }
}

export default fetchWeather;
