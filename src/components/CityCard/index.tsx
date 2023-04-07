import { Box, Text, Icon, Button } from "native-base";
import { ActivityIndicator, TouchableOpacity } from "react-native";
import { City } from "../../types/city";
import {
  Ionicons,
  MaterialIcons,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import { useContext, useEffect, useState } from "react";
import { WeatherCurrent } from "../../types/weather";
import { weatherApi } from "../../services/api";
import { API_KEY } from "@env";
import { WeatherContext } from "../../context/weather";

type PropsType = {
  city: City | null;
  updateList: () => Promise<void>;
};

export default function CityCard({ city, updateList }: PropsType) {
  const weatherContext = useContext(WeatherContext);
  const [currentWeather, setCurrentWeather] = useState<WeatherCurrent | null>(
    null
  );
  const [loading, setLoading] = useState<boolean>(false);

  async function handleRemoveCity() {
    if (city?.selected || !city) return;

    setLoading(true);
    await weatherContext?.removeCity(city);
    setLoading(false);
    await updateList();
  }

  async function handleChangeCity() {
    if (city?.selected || !city) return;

    await weatherContext?.changeCity(city);
    updateList();
  }

  useEffect(() => {
    async function getCurrentWeather() {
      try {
        const response = await weatherApi.get(
          `/report?products=observation&q=${city?.name}&lang=en-US&oneObservation=true&apiKey=${API_KEY}`
        );

        setCurrentWeather(response.data.places[0].observations[0]);
      } catch (error) {
        console.log(error);
      }
    }

    getCurrentWeather();
  }, [city]);

  return (
    <Box
      w="100%"
      mb={5}
      display="flex"
      flexDirection="row"
      alignItems="center"
      justifyContent="space-between"
    >
      <TouchableOpacity style={{ width: "88%" }} onPress={handleChangeCity}>
        <Box w="100%" display="flex" flexDirection="row" alignItems="center">
          <Box w="12%">
            {city?.selected ? (
              <Icon
                as={<MaterialIcons name="radio-button-on" />}
                size={6}
                _dark={{
                  color: "white",
                }}
                _light={{
                  color: "black",
                }}
              />
            ) : (
              <Icon
                as={<MaterialIcons name="radio-button-off" />}
                size={6}
                _dark={{
                  color: "white",
                }}
                _light={{
                  color: "black",
                }}
              />
            )}
          </Box>

          <Box
            w="88%"
            display="flex"
            flexDirection="row"
            alignItems="center"
            justifyContent="space-between"
            _dark={{ bgColor: "#0E0E0E", borderColor: "#1C1C1C" }}
            _light={{ bgColor: "#f8fafc", borderColor: "#DEDEDEDE" }}
            px={3}
            borderWidth={1}
            borderRadius={10}
          >
            {currentWeather === null ? (
              <Box
                w="full"
                display="flex"
                alignItems="center"
                justifyContent="center"
                py={4}
              >
                <ActivityIndicator size="large" />
              </Box>
            ) : (
              <>
                <Box>
                  <Box display="flex" flexDirection="row" alignItems="center">
                    <Text fontFamily="Poppins_400Regular" pr={1} fontSize={16}>
                      {city?.name}
                    </Text>
                    <Icon
                      as={<Ionicons name="ios-location-sharp" />}
                      size={4}
                      _dark={{ color: "#FFF" }}
                      _light={{ color: "#000" }}
                    />
                  </Box>
                  <Box>
                    <Text
                      fontFamily="Poppins_400Regular"
                      color="#A4A4A4"
                      fontSize={12}
                    >
                      {Number(currentWeather?.highTemperature).toFixed()}° /{" "}
                      {Number(currentWeather?.lowTemperature).toFixed()}°
                    </Text>
                  </Box>
                </Box>

                <Text fontFamily="Poppins_400Regular" fontSize={45}>
                  {currentWeather?.temperature.toFixed()}°
                </Text>
              </>
            )}
          </Box>
        </Box>
      </TouchableOpacity>
      <Button
        bg="transparent"
        variant="ghost"
        _pressed={{ bg: "tranparent" }}
        p={0}
        m={0}
        _dark={{
          bgColor: "#1C1C1C",
        }}
        _light={{
          bgColor: "#eeeeeeee",
        }}
        onPress={handleRemoveCity}
        isDisabled={city?.selected || loading}
      >
        <Icon
          as={<MaterialCommunityIcons name="minus" />}
          size={8}
          _dark={{ color: "#A4A4A4" }}
        />
      </Button>
    </Box>
  );
}
