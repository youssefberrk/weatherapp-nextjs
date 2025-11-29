import type { WeatherData } from "../types/weather";


function getIconUrl(icon: string) {
return `https://openweathermap.org/img/wn/${icon}@2x.png`;
}


export default function WeatherCard({ weather }: { weather: WeatherData }) {
const w = weather.weather[0];
return (
<div className="bg-white/80 dark:bg-gray-800/70 backdrop-blur-md rounded-xl p-6 shadow-md max-w-lg mx-auto">
<div className="flex items-center gap-4">
<img src={getIconUrl(w.icon)} alt={w.description} width={80} height={80} />
<div>
<h2 className="text-2xl font-semibold">{weather.name}</h2>
<p className="text-sm text-gray-600 dark:text-gray-300 capitalize">{w.description}</p>
</div>
</div>


<div className="mt-4 grid grid-cols-3 gap-4 text-center">
<div>
<div className="text-3xl font-bold">{Math.round(weather.main.temp)}°C</div>
<div className="text-xs text-gray-500">Temperature</div>
</div>
<div>
<div className="text-2xl">{weather.main.humidity}%</div>
<div className="text-xs text-gray-500">Humidity</div>
</div>
<div>
<div className="text-2xl">{weather.wind?.speed ?? '-'} m/s</div>
<div className="text-xs text-gray-500">Wind</div>
</div>
</div>
</div>
);
}