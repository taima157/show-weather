import { Box, Image, Text, Icon } from "native-base";
import { WeatherCurrent } from "../../types/weather";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native";

type Props = {
  weather: WeatherCurrent | null;
};

export default function WeatherCurrentCard({ weather }: Props) {
  return (
    <TouchableOpacity
      style={{
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Box w="1/2" alignItems="center">
        <Text fontFamily="Poppins_600SemiBold">{weather?.time}</Text>

        <Box position="relative" display="flex" mt={5}>
          <Text
            fontFamily="Poppins_400Regular"
            fontSize={100}
            w="full"
            textAlign="center"
          >
            {Number(weather?.temperature).toFixed()}
          </Text>
          <Text
            fontFamily="Poppins_400Regular"
            fontSize={20}
            position="absolute"
            right="-10%"
            top="15%"
          >
            °C
          </Text>
        </Box>

        <Box display="flex" alignItems="center" justifyContent="center">
          <Image src={weather?.iconLink} alt="imagem" w={50} h={50} />
          <Text fontFamily="Poppins_400Regular" pt={3}>
            {weather?.skyDesc}
          </Text>
        </Box>

        <Box
          display="flex"
          flexDirection="row"
          alignItems="center"
          w="90%"
          justifyContent="space-between"
          pt={8}
        >
          <Box display="flex" flexDirection="row" alignItems="center">
            <Icon
              as={<MaterialCommunityIcons name="arrow-up-thin" />}
              size={7}
              color="#A4A4A4"
            />
            <Text
              fontFamily="Poppins_400Regular"
              color="#FFF"
              _light={{ color: "#000" }}
            >
              {Number(weather?.highTemperature).toFixed()}°C
            </Text>
          </Box>
          <Box display="flex" flexDirection="row" alignItems="center">
            <Icon
              as={<MaterialCommunityIcons name="arrow-down-thin" />}
              size={7}
              color="#A4A4A4"
            />
            <Text
              fontFamily="Poppins_400Regular"
              color="#FFF"
              _light={{ color: "#000" }}
            >
              {Number(weather?.lowTemperature).toFixed()}°C
            </Text>
          </Box>
        </Box>

        <Text
          textAlign="center"
          fontFamily="Poppins_400Regular"
          color="#A4A4A4"
          pt={5}
        >
          {weather?.place.address.city}, {weather?.place.address.state},{" "}
          {weather?.place.address.countryName}
        </Text>
      </Box>
    </TouchableOpacity>
  );
}
