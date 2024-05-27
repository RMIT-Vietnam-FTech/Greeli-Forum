import React, { useState, useEffect, useContext } from "react";
import toast, { Toaster } from "react-hot-toast";
import { ThemeContext } from "../../../context/ThemeContext";
import WeatherApi from "../data/weatherApi";
import "../style.css";

export default function Weather() {
	const [weather, setWeather] = useState({
		icon: "",
		temp: "",
		city: "",
		description: "",
		humidity: "",
		windSpeed: "",
		pressure: "",
		maxTemp: "",
		minTemp: "",
	});
	const [forecast, setForecast] = useState([]);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);
	const { isDarkMode } = useContext(ThemeContext);

	useEffect(() => {
		fetchWeather("Ho Chi Minh City");
	}, []);

	async function fetchWeather(city) {
		setLoading(true);
		setError(null);

		try {
			const data = await WeatherApi(city);
			const currentWeather = data.currentWeather;
			const forecastData = data.forecast.list.filter(
				(_, index) => index % 8 === 0,
			); // Get forecast every 3 hours

			setWeather({
				icon: `https://openweathermap.org/img/wn/${currentWeather.weather[0].icon}@2x.png`,
				temp: currentWeather.main.temp,
				city: currentWeather.name,
				description: currentWeather.weather[0].description,
				humidity: currentWeather.main.humidity,
				windSpeed: currentWeather.wind.speed,
				pressure: currentWeather.main.pressure,
				maxTemp: currentWeather.main.temp_max,
				minTemp: currentWeather.main.temp_min,
			});

			setForecast(
				forecastData.map((f) => ({
					date: f.dt_txt,
					temp: f.main.temp,
					icon: `https://openweathermap.org/img/wn/${f.weather[0].icon}@2x.png`,
				})),
			);
		} catch (error) {
			setError("Failed to fetch weather data. Please try again.");
		} finally {
			setLoading(false);
		}
	}

	function handleSubmit(e) {
		e.preventDefault();
		const city = e.target.city.value;

		if (!city) {
			toast.error("Please enter a city");
			return;
		}

		fetchWeather(city);
	}

	function getCurrentDay() {
		const options = { weekday: "long" };
		return new Date().toLocaleDateString("en-US", options);
	}

	function getCurrentDate() {
		const options = { month: "long", day: "numeric" };
		return new Date().toLocaleDateString("en-US", options);
	}

	return (
		<div
			className="weather-container bg-greeli-subtle"
			data-bs-theme={isDarkMode ? "dark" : "light"}
		>
			<h4 className="weatherForecast text-general-emphasis">
				WEATHER FORECAST
			</h4>
			<div
				className={`mx-auto rounded text-center p-4 weather-body ${
					isDarkMode ? "dark-mode-body" : "light-mode-body"
				}`}
			>
				<Toaster position="bottom-right" reverseOrder={false} />
				<form className="d-flex mb-5" onSubmit={handleSubmit}>
					<input
						className={`form-control me-2 ${
							isDarkMode ? "dark-mode-input" : "light-mode-input"
						}`}
						placeholder="City"
						name="city"
					/>
					<button className="btn btn-outline-light" type="submit">
						Search
					</button>
				</form>

				{loading ? (
					<div
						className={`loading ${
							isDarkMode
								? "dark-mode-loading"
								: "light-mode-loading"
						}`}
					>
						<p>Loading...</p>
					</div>
				) : error ? (
					<div
						className={`error ${
							isDarkMode ? "dark-mode-error" : "light-mode-error"
						}`}
					>
						<p>
							No city found. <br /> Please make sure you entered a
							valid city name and try again.
						</p>
					</div>
				) : (
					<div className="weather-content">
						<div
							className={`current-weather ${
								isDarkMode
									? "dark-mode-content"
									: "light-mode-content"
							}`}
						>
							<h3 className="day">{getCurrentDay()}</h3>
							<p className="date">{getCurrentDate()}</p>
							<p className="city">{weather.city}</p>
							<img src={weather.icon} alt="weather-icon" />
							<h1 className="temp">{weather.temp}°C</h1>
							<p className="description">{weather.description}</p>
						</div>

						<div
							className={`weather-details ${
								isDarkMode
									? "dark-mode-details"
									: "light-mode-details"
							}`}
						>
							<div>
								<p className="weather-property">HUMIDITY</p>
								<p>{weather.humidity} %</p>
							</div>
							<div>
								<p className="weather-property">WIND</p>
								<p>{weather.windSpeed} km/h</p>
							</div>
							<div>
								<p className="weather-property">AIR PRESSURE</p>
								<p>{weather.pressure} mb</p>
							</div>
							<div>
								<p className="weather-property">MAX TEMP</p>
								<p>{weather.maxTemp} °C</p>
							</div>
							<div>
								<p className="weather-property">MIN TEMP</p>
								<p>{weather.minTemp} °C</p>
							</div>
						</div>

						<div
							className={`forecast ${
								isDarkMode
									? "dark-mode-forecast"
									: "light-mode-forecast"
							}`}
						>
							{forecast.map((day, index) => (
								<div key={index} className="forecast-day">
									<img src={day.icon} alt="forecast-icon" />
									<p>{day.temp}°C</p>
									<p>
										{new Date(day.date).toLocaleDateString(
											"en-US",
											{ weekday: "short" },
										)}
									</p>
								</div>
							))}
						</div>
					</div>
				)}
			</div>
		</div>
	);
}
