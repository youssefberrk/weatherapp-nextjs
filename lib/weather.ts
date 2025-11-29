import type { WeatherData, ForecastData } from "../types/weather";


const API_KEY = process.env.NEXT_PUBLIC_WEATHER_API_KEY;
const BASE = "https://api.openweathermap.org/data/2.5";


if (!API_KEY) {
// Note: In production you'd handle this more gracefully
// but leaving a runtime check helps catch missing env quickly.
// This file runs on the server side in Next.js builds.
console.warn("NEXT_PUBLIC_WEATHER_API_KEY is not set");
}


export async function getWeather(city: string): Promise<WeatherData> {
const url = `${BASE}/weather?q=${encodeURIComponent(city)}&appid=${API_KEY}&units=metric`;
const res = await fetch(url);


if (!res.ok) {
throw new Error(`Failed to fetch weather for ${city}: ${res.status}`);
}


const data = (await res.json()) as WeatherData;
return data;
}


export async function getForecast(city: string): Promise<ForecastData> {
const url = `${BASE}/forecast?q=${encodeURIComponent(city)}&appid=${API_KEY}&units=metric`;
const res = await fetch(url);


if (!res.ok) {
throw new Error(`Failed to fetch forecast for ${city}: ${res.status}`);
}


const data = (await res.json()) as ForecastData;
return data;
}