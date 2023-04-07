import { Box, Image, Text, Icon } from "native-base";
import { WeatherDaysForecast } from "../../types/weather";
import { MaterialCommunityIcons } from "@expo/vector-icons";

type PropsType = {
  daily: WeatherDaysForecast;
};

const months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

export default function DayCard({ daily }: PropsType) {
  if (daily === null) return <Box></Box>;

  const day = new Date(daily.time).getUTCDate();
  const month = new Date(daily.time).getMonth();

  return (
    <Box
      _dark={{ bgColor: "#131313", borderColor: "#1C1C1C" }}
      _light={{ bgColor: "#f8fafc", borderColor: "#DEDEDEDE" }}
      borderWidth={1}
      px={2}
      py={3}
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      borderRadius={10}
      mr={3}
      w="100px"
    >
      <Text
        fontFamily="Poppins_600SemiBold"
        _dark={{
          color: "#A4A4A4",
        }}
        _light={{
          color: "#909090",
        }}
        fontSize={12}
      >
        {day}, {months[month]}
      </Text>
      <Image src={daily?.iconLink} w={10} h={10} alt="weather image" mt={4} />
      <Text
        fontFamily="Poppins_400Regular"
        fontSize={10}
        my={2}
        textAlign="center"
      >
        {daily.skyDesc}
      </Text>
      <Box
        display="flex"
        flexDirection="row"
        alignItems="center"
        justifyContent="space-between"
        w="full"
        mt={2}
      >
        <Box display="flex" flexDirection="row" alignItems="center">
          <Text fontFamily="Poppins_400Regular" fontSize={10}>
            {Number(daily?.highTemperature).toFixed()}°C
          </Text>
          <Icon
            as={<MaterialCommunityIcons name="arrow-up-thin" />}
            size={4}
            color="#DA0000"
            m={0}
          />
        </Box>
        <Box display="flex" flexDirection="row" alignItems="center">
          <Icon
            as={<MaterialCommunityIcons name="arrow-down-thin" />}
            size={4}
            color="#138CD0"
          />
          <Text fontFamily="Poppins_400Regular" fontSize={10}>
            {Number(daily?.lowTemperature).toFixed()}°C
          </Text>
        </Box>
      </Box>
    </Box>
  );
}
