import type { ForecastData } from "../types/weather";


function formatTime(dt: number) {
const d = new Date(dt * 1000);
return d.toLocaleString(undefined, { hour: 'numeric', hour12: true, weekday: 'short' });
}


export default function ForecastCard({ forecast }: { forecast: ForecastData }) {

const items = forecast.list.slice(0, 8);


const iconUrl = (icon: string) => `https://openweathermap.org/img/wn/${icon}@2x.png`;


return (
<div className="mt-6">
<h3 className="text-lg font-semibold mb-3">Short-term Forecast</h3>
<div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
{items.map((it) => (
<div key={it.dt} className="bg-white/70 dark:bg-gray-800/60 rounded-lg p-3 text-center">
<div className="text-sm">{formatTime(it.dt)}</div>
<img src={iconUrl(it.weather[0].icon)} alt={it.weather[0].description} className="mx-auto" />
<div className="font-medium">{Math.round(it.main.temp)}°C</div>
<div className="text-xs text-gray-500">{it.weather[0].description}</div>
</div>
))}
</div>
</div>
);
}