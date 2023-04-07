import { City } from "./city";

export interface WeatherCurrent {
  place: {
    address: {
      countryCode: string;
      countryName: string;
      state: string;
      city: string;
    };
    location: {
      lat: number;
      lng: number;
    };
    distance: number;
  };
  daylight: string;
  description: string;
  skyInfo: number;
  skyDesc: string;
  temperature: number;
  temperatureDesc: string;
  comfort: string;
  highTemperature: string;
  lowTemperature: string;
  humidity: string;
  dewPoint: number;
  precipitationProbability: number;
  rainFall: number;
  windSpeed: number;
  windDirection: number;
  windDesc: string;
  windDescShort: string;
  uvIndex: number;
  uvDesc: string;
  barometerPressure: number;
  barometerTrend: string;
  iconId: number;
  iconName: string;
  iconLink: string;
  ageMinutes: number;
  activeAlerts: number;
  time: string;
}

export interface WeatherHourlyForecast {
  daylight: string;
  description: string;
  skyInfo: number;
  skyDesc: string;
  temperature: number;
  temperatureDesc: string;
  comfort: string;
  humidity: string;
  dewPoint: number;
  precipitationProbability: number;
  precipitationDesc: string;
  rainFall: number;
  airInfo: number;
  airDesc: string;
  windSpeed: number;
  windDirection: number;
  windDesc: string;
  windDescShort: string;
  visibility: number;
  iconId: number;
  iconName: string;
  iconLink: string;
  weekday: string;
  time: string;
}

export interface WeatherDaysForecast {
  daylight: string;
  description: string;
  skyInfo: number;
  skyDesc: string;
  temperatureDesc: string;
  comfort: string;
  highTemperature: string;
  lowTemperature: string;
  humidity: string;
  dewPoint: number;
  precipitationProbability: number;
  precipitationDesc: string;
  rainFall: number;
  windSpeed: number;
  windDirection: number;
  windDesc: string;
  windDescShort: string;
  beaufortScale: number;
  beaufortDesc: string;
  uvIndex: number;
  uvDesc: string;
  barometerPressure: number;
  iconId: number;
  iconName: string;
  iconLink: string;
  weekday: string;
  time: string;
}

export interface GeoProps {
  lat: number;
  lng: number;
}

export type WeatherContextTypes = {
  weatherCurrent: WeatherCurrent | null;
  weatherHourlyForecast: WeatherHourlyForecast[] | null;
  weatherDaysForecast: WeatherDaysForecast[] | null;
  choiceCity: (city: City) => void;
  changeCity: (city: City) => Promise<void>;
  removeCity: (city: City) => Promise<void>;
  addCity: (city: City) => Promise<void>;
};
