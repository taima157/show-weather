import { createContext, useEffect, useState } from "react";
import {
  GeoProps,
  WeatherContextTypes,
  WeatherCurrent,
  WeatherDaysForecast,
  WeatherHourlyForecast,
} from "../types/weather";
import { City } from "../types/city";
import { weatherApi } from "../services/api";
import { API_KEY } from "@env";
import AsyncStorage from "@react-native-async-storage/async-storage";

type ProviderProps = {
  children: string | JSX.Element | JSX.Element[];
};

export const WeatherContext = createContext<WeatherContextTypes | null>(null);

export function WeatherProvider({ children }: ProviderProps) {
  const [weatherCurrent, setWeatherCurrent] = useState<WeatherCurrent | null>(
    null
  );

  const [weatherHourlyForecast, setWeatherHourlyForecast] = useState<
    WeatherHourlyForecast[] | null
  >(null);

  const [weatherDaysForecast, setWeatherDaysForecast] = useState<
    WeatherDaysForecast[] | null
  >(null);



  async function addCity(cityParam: City) {
    const localCitys = await AsyncStorage.getItem("citys");

    if (localCitys !== null) {
      const citys: City[] = JSON.parse(localCitys);

      citys.forEach((city) => {
        if (city.name === cityParam.name) {
          throw new Error("Essa cidade já está adicionanda.");
        }
      });

      citys.push(cityParam);

      await AsyncStorage.setItem("citys", JSON.stringify(citys));
    }
  }

  async function removeCity(cityParam: City) {
    const localCitys = await AsyncStorage.getItem("citys");

    if (localCitys !== null) {
      const citys: City[] = JSON.parse(localCitys);

      const newCitys = citys.filter((city) => {
        if (city.name !== cityParam.name) {
          return city;
        }
      });

      await AsyncStorage.setItem("citys", JSON.stringify(newCitys));
    }
  }

  async function changeCity(cityParam: City) {
    const localCitys = await AsyncStorage.getItem("citys");

    if (localCitys !== null) {
      const citys: City[] = JSON.parse(localCitys);

      const newCitys = citys.map((city) => {
        if (city.selected) {
          city.selected = false;
        }

        if (city.name === cityParam.name) {
          city.selected = true;
        }

        return city;
      });

      await AsyncStorage.setItem("citys", JSON.stringify(newCitys));
      choiceCity(cityParam);
    }
  }

  function choiceCity(city: City) {
    getWeatherCurrent(city.location);
  }

  async function getWeatherCurrent({ lat, lng }: GeoProps) {
    try {
      const response = await weatherApi.get(
        `/report?products=observation&location=${lat},${lng}&oneObservation=true&apiKey=${API_KEY}`
      );

      console.log(response);
      setWeatherCurrent(response.data.places[0].observations[0]);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    async function getLocalCitys() {
      try {
        const localCitys = await AsyncStorage.getItem("citys");

        if (localCitys !== null) {
          const citys: City[] = JSON.parse(localCitys);

          citys.forEach((city) => {
            if (city.selected) {
              choiceCity(city);
            }
          });
        } else {
          const citys: City[] = [
            {
              name: "São Paulo",
              location: {
                lat: -22,
                lng: -49,
              },
              selected: true,
            },
          ];

          await AsyncStorage.setItem("citys", JSON.stringify(citys));
          choiceCity(citys[0]);
        }
      } catch (error) {
        console.log(error);
      }
    }

    getLocalCitys();
  }, []);

  return (
    <WeatherContext.Provider
      value={{
        weatherCurrent,
        weatherHourlyForecast,
        weatherDaysForecast,
        choiceCity,
        addCity,
        removeCity,
        changeCity,
      }}
    >
      {children}
    </WeatherContext.Provider>
  );
}
