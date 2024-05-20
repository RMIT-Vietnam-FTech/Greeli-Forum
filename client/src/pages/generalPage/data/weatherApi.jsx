import axios from "axios";

const WeatherApi = async (city) => {
    const API_KEY = "0668f45ab38ff90535c60b49113558cd";
    const currentWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;
    const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}&units=metric`;

    try {
        const currentWeatherResponse = await axios.get(currentWeatherUrl);
        const forecastResponse = await axios.get(forecastUrl);
        return {
            currentWeather: currentWeatherResponse.data,
            forecast: forecastResponse.data
        };
    } catch (error) {
        console.error("Error fetching the weather data", error);
        throw error;
    }
}

export default WeatherApi;
