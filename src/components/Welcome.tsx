import React, { useState } from 'react'

import Today from "./Today.tsx";
import InfoCard from "./InfoCard.tsx";
import DailyCard from "./DailyCard.tsx";
import HourlyCard from "./HourlyCard.tsx";

import.meta.env.API_KEY;

import search from '../assets/images/icon-search.svg'

const Welcome = () => {

	const [city, setCity] = useState("São Paulo")
	const [todayTemperature, setTodayTemperature] = useState(21)


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


		//Get Weather
		const weatherRes = await fetch(
			`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`,
		);
		const weatherData = await weatherRes.json();
		console.log(weatherData);

		if(weatherData){
			setCity(cityName)
			setTodayTemperature(weatherData.current_weather.temperature)
		}

	}

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
						<Today city={city} date="Tuesday, Aug 5, 2025" temperature={todayTemperature} imagePath="fog" unit="°"/>
						<div className="flex w-full gap-3 mt-4">
							<InfoCard title="Feels Like" number={18} unit="°" />
							<InfoCard title="Humidity" number={46} unit="%" />
							<InfoCard title="Wind" number={14} unit=" km/h" />
							<InfoCard title="Precipitation" number={0} unit="mm" />
						</div>
						<div className="mt-6">
							<p>Daily forecast</p>
							<div className="flex gap-2 mt-3">
								<DailyCard day="Tue" imagePath="rain" />
								<DailyCard day="Wed" imagePath="drizzle" />
								<DailyCard day="Thu" imagePath="sunny" />
								<DailyCard day="Fri" imagePath="cloudy" />
								<DailyCard day="Sat" imagePath="storm" />
								<DailyCard day="Sun" imagePath="fog" />
								<DailyCard day="Mon" imagePath="partlyCloud" />
							</div>
						</div>
					</div>
				</div>
				<div className="bg-neutral-800 w-1/3 px-4 py-6 rounded-lg mt-10">
					<div className="flex justify-between mb-8">
						<p>Hourly forecast</p>
						<p>Tuesday</p>
					</div>
					<div className="flex flex-col gap-3">
						<HourlyCard imagePath="cloudy" hour="3 PM" climate="20°" />
						<HourlyCard imagePath="cloudy" hour="3 PM" climate="20°" />
						<HourlyCard imagePath="cloudy" hour="3 PM" climate="20°" />
						<HourlyCard imagePath="cloudy" hour="3 PM" climate="20°" />
						<HourlyCard imagePath="cloudy" hour="3 PM" climate="20°" />
						<HourlyCard imagePath="cloudy" hour="3 PM" climate="20°" />
						<HourlyCard imagePath="cloudy" hour="3 PM" climate="20°" />
						<HourlyCard imagePath="cloudy" hour="3 PM" climate="20°" />
					</div>
				</div>
			</div>
		</div>
	)
}

export default Welcome




{/* <script>

document.getElementById("search")?.addEventListener("submit", async (e) => {
	e.preventDefault();

	const cityName = document.getElementById("city_name").value;
	const GEO_URL = `https://geocoding-api.open-meteo.com/v1/search?name=${cityName}&count=1&language=en&format=json`;

	//Get Geo data from API
	const geoRes = await fetch(GEO_URL);
	const geoData = await geoRes.json();
	if (!geoData.results?.length) {
		return new Response("City not found", { status: 404 });
	}

	const { latitude, longitude } = geoData.results[0];

	//Get Weather
	const weatherRes = await fetch(
		`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`,
	);
	const weatherData = await weatherRes.json();
	console.log(weatherData);


	return new Response(JSON.stringify(weatherData), {
		status: 200,
		headers: { "Content-Type": "application/json" },
	});
});
</script >
 */}