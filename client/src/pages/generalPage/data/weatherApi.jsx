import axios from "axios";

const WeatherApi = async (city) => {
	const apiKey = "0c44c252ca37f03dce72864824992126";
	const currentWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
	const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;

	try {
		const currentWeatherResponse = await axios.get(currentWeatherUrl, {
			withCredentials: false,
		});
		const forecastResponse = await axios.get(forecastUrl, {
			withCredentials: false,
		});
		console.log(currentWeatherResponse);
		return {
			currentWeather: currentWeatherResponse.data,
			forecast: forecastResponse.data,
		};
	} catch (error) {
		console.error("Error fetching the weather data", error);
		throw error;
	}
};

export default WeatherApi;
