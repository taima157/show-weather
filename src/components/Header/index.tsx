import {
  Box,
  Button,
  Icon,
  Text,
  useColorMode,
  StatusBar,
  useColorModeValue,
} from "native-base";
import { Octicons } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { propHeader, propStack } from "../../types/routes";
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { City } from "../../types/city";

export default function Header(props: propHeader) {
  const theme = useColorModeValue("Light", "Dark");
  const { toggleColorMode } = useColorMode();
  const [cityName, setCityName] = useState<string | null>(null);

  const navigation = useNavigation<propStack>();

  useEffect(() => {
    async function getLocalCitys() {
      try {
        const localCitys = await AsyncStorage.getItem("citys");

        if (localCitys !== null) {
          const citys: City[] = JSON.parse(localCitys);

          citys.forEach((city) => {
            if (city.selected) {
              setCityName(city.name);
            }
          });
        }
      } catch (error) {
        console.log(error);
      }
    }

    getLocalCitys();
  }, []);

  return (
    <Box
      _dark={{ bgColor: "#131313" }}
      _light={{ bgColor: "#f8fafc" }}
      px={5}
      pt={8}
      pb={2}
    >
      <Box
        display="flex"
        flexDirection="row"
        w="full"
        justifyContent="space-between"
      >
        <Text fontFamily="Poppins_600SemiBold" fontSize={20}>
          Show Weather
        </Text>
        <Button
          bg="transparent"
          _pressed={{ bg: "tranparent" }}
          variant="ghost"
          p={0}
          m={0}
          onPress={toggleColorMode}
        >
          <Icon
            as={<Octicons name="gear" />}
            size={7}
            _dark={{ color: "#A4A4A4" }}
          />
        </Button>
      </Box>

      {props.route.name !== "SelectCity" ? (
        <Box
          display="flex"
          flexDirection="row"
          w="full"
          justifyContent="space-between"
          alignItems="center"
          pt={5}
        >
          <Button
            p={1}
            m={0}
            pr={20}
            _dark={{
              bgColor: "#1C1C1C",
            }}
            _light={{
              bgColor: "#eeeeeeee",
            }}
            variant="ghost"
            onPress={() => navigation.navigate("Home")}
          >
            <Text fontFamily="Poppins_500Medium">{cityName}</Text>
            <Text
              fontFamily="Poppins_400Regular"
              fontSize={10}
              _dark={{ color: "#A4A4A4" }}
            >
              Current city
            </Text>
          </Button>
          <Button
            bg="transparent"
            variant="ghost"
            _pressed={{ bg: "tranparent" }}
            p={0}
            m={0}
            onPress={() => navigation.navigate("SelectCity")}
          >
            <Icon
              as={<MaterialIcons name="menu" />}
              size={8}
              _dark={{ color: "#A4A4A4" }}
            />
          </Button>
        </Box>
      ) : null}

      <StatusBar backgroundColor={theme === "Light" ? "#f8fafc" : "#131313"} />
    </Box>
  );
}
