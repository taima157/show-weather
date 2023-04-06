import { useColorModeValue, Box, Text } from "native-base";
import { useContext } from "react";
import { WeatherContext } from "../../context/weather";
import { WeatherContextTypes } from "../../types/weather";
import WeatherCurrentCard from "../../components/WeatherCurrentCard";

export default function Home() {
  const weatherContext = useContext<WeatherContextTypes | null>(WeatherContext);
  const mode = useColorModeValue("Light", "Dark");

  if (weatherContext === null) return <Box></Box>;

  return (
    <Box
      style={{ flex: 1 }}
      _dark={{ bgColor: "#0B0B0B" }}
      _light={{ bgColor: "#FFF" }}
      display="flex"
      justifyContent="space-between"
    >
      <Box display="flex" alignItems="center" justifyContent="center" pt={20}>
        {/* {weatherContext.weatherCurrent !== null ? (
          
        ) : null} */}
        <WeatherCurrentCard weather={weatherContext.weatherCurrent} />
      </Box>
      <Box pb={2}>
        <Text fontFamily="Poppins_400Regular" textAlign="center" fontSize={12}>
          Data provided by{" "}
          <Text fontFamily="Poppins_600SemiBold">Wheater HereAPI</Text>
        </Text>
      </Box>
    </Box>
  );
}
