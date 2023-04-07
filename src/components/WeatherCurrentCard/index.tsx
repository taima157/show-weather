import { Box, Image, Text, Icon, Button } from "native-base";
import { WeatherCurrent } from "../../types/weather";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { propStack } from "../../types/routes";

type Props = {
  weather: WeatherCurrent | null;
};

const weeks = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export default function WeatherCurrentCard({ weather }: Props) {
  if (weather === null) return <Box></Box>;

  const navigation = useNavigation<propStack>();

  const week = new Date(weather.time).getUTCDay();
  const month = new Date(weather.time).getMonth();

  const date = {
    day: new Date(weather.time).getUTCDate(),
    week: weeks[week],
    month: months[month],
    year: new Date(weather.time).getFullYear(),
  };

  return (
    <Box
      w="full"
      display="flex"
      alignItems="center"
      justifyContent="center"
      px={10}
    >
      <Box w="full" alignItems="center">
        <Text fontFamily="Poppins_600SemiBold" textAlign="center">
          {date.week}, {date.day} {date.month}, {date.year}
        </Text>

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
            right="-6%"
            top="15%"
          >
            °C
          </Text>
        </Box>

        <Box display="flex" alignItems="center" justifyContent="center">
          <Image src={weather?.iconLink} alt="imagem" w={65} h={65} />
          <Text fontFamily="Poppins_400Regular" pt={3} textAlign="center">
            {weather?.skyDesc}
          </Text>
        </Box>

        <Box
          w="90%"
          borderRadius={5}
          _dark={{
            bgColor: "#1C1C1C",
          }}
          _light={{
            bgColor: "#eeeeeeee",
          }}
          mt={4}
          py={4}
          justifyContent="center"
          alignItems="center"
        >
          <Box
            display="flex"
            flexDirection="row"
            alignItems="center"
            justifyContent="space-between"
            w="70%"
          >
            <Box display="flex" flexDirection="row" alignItems="center">
              <Text fontFamily="Poppins_400Regular" fontSize={18}>
                {Number(weather?.highTemperature).toFixed()}°C
              </Text>
              <Icon
                as={<MaterialCommunityIcons name="arrow-up-thin" />}
                size={8}
                color="#DA0000"
                m={0}
              />
            </Box>
            <Box display="flex" flexDirection="row" alignItems="center">
              <Icon
                as={<MaterialCommunityIcons name="arrow-down-thin" />}
                size={8}
                color="#138CD0"
              />
              <Text fontFamily="Poppins_400Regular" fontSize={18}>
                {Number(weather?.lowTemperature).toFixed()}°C
              </Text>
            </Box>
          </Box>

          <Text
            textAlign="center"
            fontFamily="Poppins_500Medium"
            pt={5}
            w="full"
          >
            {weather?.place.address.city}, {weather?.place.address.state},{" "}
            {weather?.place.address.countryName}
          </Text>
        </Box>
      </Box>

      <TouchableOpacity
        style={{ width: "90%" }}
        onPress={() => navigation.navigate("DetailForecast")}
      >
        <Text
          textAlign="right"
          mt={5}
          w="full"
          fontFamily="Poppins_600SemiBold"
        >
          More details...
        </Text>
      </TouchableOpacity>
    </Box>
  );
}
