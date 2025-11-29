import type { Metadata } from 'next';
import WeatherCard from '@/Components/WeatherCard';
import ForecastCard from '@/Components/ForecastCard';
import { getWeather, getForecast } from '@/lib/weather';
import type { WeatherData, ForecastData } from '@/types/weather';
import { z } from 'zod';

const CitySchema = z
  .string()
  .min(1, 'City name cannot be empty')
  .regex(/^[a-zA-Z\s]+$/, 'City name must contain only letters');

interface Props {
  params: { city: string };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { city } = await params;
  return { title: `Weather — ${city}` };
}

export default async function Page({ params }: Props) {
  const { city } = await params;

  let cityParam: string;
  try {
  cityParam = CitySchema.parse(city.trim());
} catch (err: unknown) {
  return (
    <main className="min-h-screen flex items-center justify-center p-6">
      <div className="text-center">
        <h2 className="text-2xl font-semibold mb-2">Invalid city name</h2>
        <p className="text-gray-600">{(err as Error)?.message ?? 'Invalid city name'}</p>
      </div>
    </main>
  );
}


  let weather: WeatherData | null = null;
  let forecast: ForecastData | null = null;
  let error: Error | null = null;

  try {
    [weather, forecast] = await Promise.all([
      getWeather(cityParam),
      getForecast(cityParam),
    ]);
  } catch (err: unknown) {
    error = err as Error;
  }

  if (error || !weather || !forecast) {
    return (
      <main className="min-h-screen flex items-center justify-center p-6">
        <div className="text-center">
          <h2 className="text-2xl font-semibold mb-2">
            {`Could not find weather for "${cityParam}"`}
          </h2>
          <p className="text-gray-600">{error?.message ?? 'Unknown error'}</p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen p-6">
      <div className="max-w-3xl mx-auto">
        <WeatherCard weather={weather} />
        <ForecastCard forecast={forecast} />
      </div>
    </main>
  );
}