import { Box, Text, Button, Icon, ScrollView } from "native-base";
import { propStack } from "../../types/routes";
import { useNavigation } from "@react-navigation/native";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import CityCard from "../../components/CityCard";

export default function SelectCity() {
  const navigation = useNavigation<propStack>();

  return (
    <Box
      flex={1}
      _dark={{ bgColor: "#0B0B0B" }}
      _light={{ bgColor: "#FFF" }}
      px={5}
    >
      <Box
        display="flex"
        flexDirection="row"
        w="full"
        justifyContent="space-between"
        alignItems="center"
        pt={5}
      >
        <Box display="flex" flexDirection="row" alignItems="center">
          <Button
            p={0}
            m={0}
            _dark={{
              bgColor: "#1C1C1C",
            }}
            _light={{
              bgColor: "#eeeeeeee",
            }}
            variant="ghost"
            onPress={() => navigation.goBack()}
          >
            <Icon
              as={<Ionicons name="chevron-back" />}
              size={8}
              _dark={{ color: "#A4A4A4" }}
            />
          </Button>
          <Text fontFamily="Poppins_600SemiBold" pl={3} color="#A4A4A4">
            Select City
          </Text>
        </Box>
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
          onPress={() => navigation.navigate("SelectCity")}
        >
          <Icon
            as={<MaterialCommunityIcons name="plus" />}
            size={8}
            _dark={{ color: "#A4A4A4" }}
          />
        </Button>
      </Box>

      <Box w="full" pt={10}>
        <ScrollView>
          <CityCard city={null} />
          <CityCard city={null} />
          <CityCard city={null} />
        </ScrollView>
      </Box>
    </Box>
  );
}
