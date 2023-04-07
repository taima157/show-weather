import { Box, Image, Text } from "native-base";
import { WeatherHourlyForecast } from "../../types/weather";

type PropsType = {
  hourly: WeatherHourlyForecast;
};

export default function HourlyCard({ hourly }: PropsType) {
  if (hourly === null) return <Box></Box>;

  const hour = new Date(hourly.time).getHours();

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
        {hour}:00
      </Text>
      <Image src={hourly?.iconLink} w={10} h={10} alt="weather image" mt={2} />
      <Text
        fontFamily="Poppins_400Regular"
        fontSize={10}
        my={2}
        textAlign="center"
      >
        {hourly.skyDesc}
      </Text>
      <Text fontFamily="Poppins_400Regular" fontSize={20} mt={2}>
        {hourly.temperature.toFixed()}°C
      </Text>
    </Box>
  );
}
