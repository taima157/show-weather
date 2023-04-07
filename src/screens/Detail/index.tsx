import { Box, Text } from "native-base";
import { useContext } from "react";
import { WeatherContext } from "../../context/weather";

export default function Detail() {
  const weather = useContext(WeatherContext);

  if (weather === null)
    return (
      <Box
        flex={1}
        _dark={{ bgColor: "#0B0B0B" }}
        _light={{ bgColor: "#FFF" }}
        px={5}
        pt={10}
      ></Box>
    );

  return (
    <Box
      flex={1}
      _dark={{ bgColor: "#0B0B0B" }}
      _light={{ bgColor: "#FFF" }}
      px={5}
      pt={10}
    >
      <Box w="full" mb={10}>
        <Text fontFamily="Poppins_600SemiBold">Precipitation:</Text>
        <Text fontFamily="Poppins_400Regular" color="#A4A4A4">
          {weather.weatherCurrent?.precipitationProbability} mm
        </Text>
      </Box>
      <Box w="full" mb={10}>
        <Text fontFamily="Poppins_600SemiBold">Humidity:</Text>
        <Text fontFamily="Poppins_400Regular" color="#A4A4A4">
          {weather.weatherCurrent?.humidity}%
        </Text>
      </Box>
      <Box w="full" mb={10}>
        <Text fontFamily="Poppins_600SemiBold">Dew point:</Text>
        <Text fontFamily="Poppins_400Regular" color="#A4A4A4">
          {weather.weatherCurrent?.dewPoint}
        </Text>
      </Box>
      <Box w="full" mb={10}>
        <Text fontFamily="Poppins_600SemiBold">UV:</Text>
        <Text fontFamily="Poppins_400Regular" color="#A4A4A4">
          {weather.weatherCurrent?.uvIndex}, {weather.weatherCurrent?.uvDesc}
        </Text>
      </Box>
      <Box w="full" mb={10}>
        <Text fontFamily="Poppins_600SemiBold">Wind speed:</Text>
        <Text fontFamily="Poppins_400Regular" color="#A4A4A4">
          {weather.weatherCurrent?.windSpeed} km/h
        </Text>
      </Box>
      <Box w="full" mb={10}>
        <Text fontFamily="Poppins_600SemiBold">Pressure:</Text>
        <Text
          fontFamily="Poppins_400Regular"
          _dark={{
            color: "#A4A4A4",
          }}
          _light={{
            color: "#909090",
          }}
        >
          {weather.weatherCurrent?.barometerPressure} hPa
        </Text>
      </Box>
    </Box>
  );
}
