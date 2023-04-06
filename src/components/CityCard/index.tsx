import { Box, Text, Icon, Button } from "native-base";
import { TouchableOpacity } from "react-native";
import { City } from "../../types/city";
import { Ionicons } from "@expo/vector-icons";

type PropsType = {
  city: City | null;
};

export default function CityCard({ city }: PropsType) {
  return (
    <TouchableOpacity>
      <Box
        w="full"
        display="flex"
        flexDirection="row"
        alignItems="center"
        justifyContent="space-between"
        _dark={{ bgColor: "#0E0E0E", borderColor: "#1C1C1C" }}
        _light={{ bgColor: "#f8fafc", borderColor: "#DEDEDEDE" }}
        px={3}
        borderWidth={1}
        borderRadius={10}
        mb={5}
      >
        <Box>
          <Box display="flex" flexDirection="row" alignItems="center">
            <Text fontFamily="Poppins_400Regular" pr={2} fontSize={18}>
              São Paulo
            </Text>
            <Icon
              as={<Ionicons name="ios-location-sharp" />}
              size={5}
              _dark={{ color: "#FFF" }}
              _light={{ color: "#000" }}
            />
          </Box>
          <Box>
            <Text fontFamily="Poppins_400Regular" color="#A4A4A4" fontSize={14}>
              28° / 17°
            </Text>
          </Box>
        </Box>

        <Text fontFamily="Poppins_400Regular" fontSize={50}>
          20°
        </Text>
      </Box>
    </TouchableOpacity>
  );
}
