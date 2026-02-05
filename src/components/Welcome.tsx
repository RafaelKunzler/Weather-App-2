import React, { useEffect, useState } from 'react'
import { format, parseISO, startOfHour, isAfter, isEqual } from 'date-fns';

import Today from "./Today.tsx";
import InfoCard from "./InfoCard.tsx";
import DailyCard from "./DailyCard.tsx";
import HourlyCard from "./HourlyCard.tsx";

import search from '../assets/images/icon-search.svg'

const Welcome = () => {

	const today = startOfHour(new Date())
	const formattedToday = format(today, 'PPPP');
	const day = format(today, 'iiii');

	const [city, setCity] = useState("")
	const [todayTemperature, setTodayTemperature] = useState()
	const [todayWeatherCode, setTodayWeatherCode] = useState()
	const [windSpeed, setWindSpeed] = useState()
	const [apparentTemperature, setApparentTemperature] = useState()
	const [humidity, setHumidity] = useState()
	const [precipitation, setPrecipitation] = useState()

	const [dailymaxTemp, setDailyMaxTemp] = useState([])
	const [dailyminTemp, setDailyMinTemp] = useState([])
	const [dailyWeatherCode, setDailyWeatherCode] = useState([])
	const [dailyTime, setDailyTime] = useState([])

	const [hourlyTemp, setHourlyTemp] = useState([])
	const [hourlyTime, setHourlyTime] = useState([])
	const [hourlyWeatherCode, setHourlyWeatherCode] = useState([])
	

	//fetch weather on start
	useEffect(() => {
		fetchWeather(-23.5475, -46.63611, "São Paulo")
	}, [])


	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		const formData = new FormData(e.currentTarget)
		const cityName = formData.get('q')

		const GEO_URL = `https://geocoding-api.open-meteo.com/v1/search?name=${cityName}&count=1&language=en&format=json`;

		//Get Geo data from API
		const geoRes = await fetch(GEO_URL);
		const geoData = await geoRes.json();
		if (!geoData.results?.length) {
			return new Response("City not found", { status: 404 });
		}

		const { latitude, longitude } = geoData.results[0];
		console.log(latitude, longitude);

		fetchWeather(latitude, longitude, cityName)
	}

	const fetchWeather = async (latitude: number, longitude: number, cityName: string) => {
		const url = new URL('https://api.open-meteo.com/v1/forecast')

		url.searchParams.set('latitude', String(latitude))
		url.searchParams.set('longitude', String(longitude))

		url.searchParams.set(
			'current',
			[
				'temperature_2m',
				'apparent_temperature',
				'relative_humidity_2m',
				'precipitation',
				'weathercode',
				'wind_speed_10m',
			].join(',')
		)

		url.searchParams.set(
			'daily',
			[
				'weathercode',
				'temperature_2m_max',
				'temperature_2m_min',
			].join(',')
		)

		url.searchParams.set(
			'hourly',
			[
				'temperature_2m',
				'weathercode',
			].join(',')
		)

		url.searchParams.set('temperature_unit', 'celsius')
		url.searchParams.set('wind_speed_unit', 'kmh')
		url.searchParams.set('precipitation_unit', 'mm')
		url.searchParams.set('timezone', 'auto')

		const weatherRes = await fetch(url.toString())
		const weatherData = await weatherRes.json()

		console.log(weatherData)

		if (weatherData) {
			changeStates(weatherData, cityName)
		}
	}

	// set states after weather fetch
	const changeStates = (weatherData, cityName) => {
		setCity(cityName)
		setTodayTemperature(weatherData.current.temperature_2m)
		setTodayWeatherCode(weatherData.current.weathercode)
		setWindSpeed(weatherData.current.wind_speed_10m)
		setApparentTemperature(weatherData.current.apparent_temperature)
		setHumidity(weatherData.current.relative_humidity_2m)
		setPrecipitation(weatherData.current.precipitation)

		setDailyMaxTemp(weatherData.daily.temperature_2m_max)
		setDailyMinTemp(weatherData.daily.temperature_2m_min)
		setDailyWeatherCode(weatherData.daily.weathercode)
		setDailyTime(weatherData.daily.time)

		setHourlyTemp(weatherData.hourly.temperature_2m)
		setHourlyWeatherCode(weatherData.hourly.weathercode)
		const hours = weatherData.hourly.time
		const next7Hours = hours
			.map(time => parseISO(time)) // string -> Date
			.filter(date => isAfter(date, today) || isEqual(date, today))
			.slice(0, 24)
			.map(date => format(date, 'H a'));
			setHourlyTime(next7Hours)
	}

	useEffect(() => {
		console.log('hourlyForecast atualizado:', hourlyTime)
	}, [hourlyTime])



	return (
		<div className="pb-10">
			<div className="flex flex-col gap-12 items-center">
				<h1 className="font-bold text-5xl text-center">How's the sky looking today?</h1>
				<form onSubmit={handleSubmit} method="get" className="flex w-1/2 gap-4 text-neutral-100">
					<div className="relative w-full">
						<img
							src={search.src}
							alt="search"
							className="absolute left-3 top-1/2 -translate-y-1/2"
						/>
						<input
							type="text"
							name="q"
							placeholder={"Search for a place..."}
							className="w-full bg-neutral-800 rounded-lg px-3 pl-12 py-3"
							id="city_name"
						/>
					</div>
					<button type="submit" className="bg-blue-500 px-4 py-2 rounded-lg">
						Search
					</button>
				</form>
			</div>
			<div className="flex gap-12">
				<div className="w-2/3">
					<div>
						<Today city={city} date={formattedToday} temperature={todayTemperature} weatherCode={todayWeatherCode} unit="°" />
						<div className="flex w-full gap-3 mt-4">
							<InfoCard title="Feels Like" number={apparentTemperature} unit="°" />
							<InfoCard title="Humidity" number={humidity} unit="%" />
							<InfoCard title="Wind" number={windSpeed} unit=" km/h" />
							<InfoCard title="Precipitation" number={precipitation} unit="mm" />
						</div>
						<div className="mt-6">
							<p>Daily forecast</p>
							<div className="flex gap-2 mt-3">
								{Array.from({ length: 7 }).map((_, index) => (
									<DailyCard day={dailyTime[index] || "2026-02-04"} weatherCode={dailyWeatherCode[index]} maxTemp={dailymaxTemp[index]} minTemp={dailyminTemp[index]} />
								))}
							</div>
						</div>
					</div>
				</div>
				<div className="bg-neutral-800 w-1/3 px-4 py-6 rounded-lg mt-10">
					<div className="flex justify-between mb-8">
						<p>Hourly forecast</p>
						<p>{day}</p>
					</div>
					<div className="flex flex-col gap-3">
						{Array.from({ length: 8 }).map((_, index) => (
							<HourlyCard weatherCode={hourlyWeatherCode[index]} hour={hourlyTime[index] || "2026-02-04"} climate={hourlyTemp[index]} />
						))}

					</div>
				</div>
			</div>
		</div>
	)
}

export default Welcome
