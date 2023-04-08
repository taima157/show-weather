import { Box, Text, Link } from "native-base";
import { useContext } from "react";
import { WeatherContext } from "../../context/weather";
import { WeatherContextTypes } from "../../types/weather";
import WeatherCurrentCard from "../../components/WeatherCurrentCard";
import { ActivityIndicator } from "react-native";

export default function Home() {
  const weatherContext = useContext<WeatherContextTypes | null>(WeatherContext);

  if (weatherContext === null) return <Box></Box>;

  return (
    <Box
      flex={1}
      _dark={{ bgColor: "#0B0B0B" }}
      _light={{ bgColor: "#FFF" }}
      display="flex"
      justifyContent="space-between"
    >
      <Box display="flex" alignItems="center" justifyContent="center" flex={1}>
        {weatherContext.weatherCurrent === null ? (
          <ActivityIndicator size="large" />
        ) : (
          <WeatherCurrentCard weather={weatherContext.weatherCurrent} />
        )}
      </Box>
      <Box
        pb={2}
        display="flex"
        w="full"
        flexDirection="row"
        justifyContent="center"
        alignItems="center"
      >
        <Text fontFamily="Poppins_400Regular" fontSize={12}>
          Data provided by{" "}
        </Text>
        <Link
          href="https://www.here.com"
          _text={{
            fontFamily: "Poppins_600SemiBold",
            fontSize: 12,
          }}
          isUnderlined={false}
        >
          Weather HereAPI
        </Link>
      </Box>
    </Box>
  );
}
