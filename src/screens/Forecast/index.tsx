import { Box, ScrollView, Text } from "native-base";
import { useContext } from "react";
import { WeatherContext } from "../../context/weather";
import HourlyCard from "../../components/HourlyCard";
import DayCard from "../../components/DayCard";

export default function Forecast() {
  const weather = useContext(WeatherContext);

  if (weather === null) {
    return (
      <Box
        flex={1}
        _dark={{ bgColor: "#0B0B0B" }}
        _light={{ bgColor: "#FFF" }}
      ></Box>
    );
  }

  return (
    <Box
      flex={1}
      _dark={{ bgColor: "#0B0B0B" }}
      _light={{ bgColor: "#FFF" }}
      px={5}
      pt={10}
    >
      <Box w="full">
        <Text
          fontFamily="Poppins_600SemiBold"
          _dark={{
            color: "#A4A4A4",
          }}
          _light={{
            color: "#909090",
          }}
          fontSize={16}
        >
          Hourly forecast
        </Text>
        <Box w="full" mt={3}>
          <ScrollView horizontal={true}>
            {weather.weatherHourlyForecast?.map((hourly, index) => {
              return <HourlyCard key={index} hourly={hourly} />;
            })}
          </ScrollView>
        </Box>
      </Box>
      <Box w="full" mt={10}>
        <Text
          fontFamily="Poppins_600SemiBold"
          _dark={{
            color: "#A4A4A4",
          }}
          _light={{
            color: "#909090",
          }}
          fontSize={16}
        >
          7 days forecast
        </Text>
        <Box w="full" mt={3}>
          <ScrollView horizontal={true}>
            {weather.weatherDaysForecast?.map((daily, index) => {
              return <DayCard key={index} daily={daily} />;
            })}
          </ScrollView>
        </Box>
      </Box>
    </Box>
  );
}
