import axios from "axios";
import { GEO_API_URL, WEATHER_API_URL } from "@env";

export const weatherApi = axios.create({
  baseURL: WEATHER_API_URL,
});

export const geoApi = axios.create({
  baseURL: GEO_API_URL,
});
