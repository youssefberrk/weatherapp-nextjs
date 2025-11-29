export interface WeatherData {
name: string;
dt: number;
main: {
temp: number;
feels_like: number;
temp_min: number;
temp_max: number;
humidity: number;
};
weather: {
id: number;
main: string;
description: string;
icon: string;
}[];
wind?: {
speed: number;
deg?: number;
};
}


export interface ForecastItem {
dt: number;
main: {
temp: number;
temp_min: number;
temp_max: number;
};
weather: {
description: string;
icon: string;
}[];
}


export interface ForecastData {
city: {
name: string;
};
list: ForecastItem[];
}