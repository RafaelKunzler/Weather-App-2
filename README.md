# 🌤️ Weather App (Astro Edition)

A weather forecast application built with Astro that consumes the Open-Meteo API to display current and weekly weather data.  

This project is actually a recreation of one of my very first projects, rebuilt with a more structured architecture and modern tooling.

## ✨ Technologies

- `Astro`
- `React` (Islands Architecture)
- `Open-Meteo API`
- `date-fns`
- `Tailwind CSS`

## 🚀 Features

- **Current Weather Display** – Shows real-time weather data
- **Weekly Forecast** – Displays upcoming days with formatted dates
- **Shared State Between Components** – Weather data distributed across UI sections
- **Dynamic React Islands** – Interactive components inside an Astro project
- **Date Formatting** – Clean and readable dates using date-fns
- **Responsive Layout** – Works across desktop and mobile

## 📍 The Process

This project is a remake of one of the first apps I ever built, but this time with better structure and architecture.

Initially, I chose Astro to explore its performance benefits and partial hydration model. However, since the entire app relies on dynamic weather data and interactive components, most of the UI required client-side behavior.

To handle that properly, I used **React Islands inside Astro**, allowing me to keep the Astro structure while making dynamic parts interactive.

The app consumes the **Open-Meteo API**, processes the response, and shares the data between components. I also used `date-fns` to ensure date formatting is clean and readable.

It turned into a great learning experience about choosing the right tool for the job and understanding when a static-first framework might not be ideal for a fully dynamic app.

## 🧠 Architecture Highlights

- **Astro Layout Layer** – Handles base structure and page organization
- **React Islands** – Dynamic weather components
- **API Layer** – Fetches and processes Open-Meteo data
- **Shared Data Flow** – Weather data passed across UI sections
- **Utility Layer** – Date formatting with date-fns

## 🚦 Running the Project

1. Clone the repository  
2. Install dependencies: `npm install`  
3. Run development server: `npm run dev`  
4. Open `http://localhost:4321` in your browser  

## 🌍 Live Demo

Live version: https://weather-app-2.vercel.app
