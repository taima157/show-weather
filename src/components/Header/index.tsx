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
import { useContext, useEffect, useState } from "react";
import { WeatherContext } from "../../context/weather";

export default function Header(props: propHeader) {
  const theme = useColorModeValue("Light", "Dark");
  const { toggleColorMode } = useColorMode();
  const weather = useContext(WeatherContext);

  const navigation = useNavigation<propStack>();

  if (props.route.name === "Settings") {
    return <Box></Box>;
  }

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
          bgColor="transparent"
          _pressed={{
            opacity: 0.5,
          }}
          variant="ghost"
          p={0}
          m={0}
          onPress={() => navigation.navigate("Settings")}
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
            py={1}
            px={2}
            m={0}
            _dark={{
              bgColor: "#1C1C1C",
            }}
            _light={{
              bgColor: "#eeeeeeee",
            }}
            _pressed={{
              opacity: 0.5,
            }}
            variant="ghost"
            onPress={() => navigation.navigate("Home")}
            w="65%"
            justifyContent="flex-start"
          >
            <Text fontFamily="Poppins_500Medium" textAlign="left" w="full">
              {weather?.weatherCurrent?.place.address.city !== undefined
                ? weather?.weatherCurrent?.place.address.city
                : weather?.weatherCurrent?.place.address.state}
            </Text>
            <Text
              fontFamily="Poppins_400Regular"
              fontSize={10}
              _dark={{ color: "#A4A4A4" }}
            >
              Current city
            </Text>
          </Button>
          <Button
            bgColor="transparent"
            variant="ghost"
            _pressed={{
              opacity: 0.5,
            }}
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

      <StatusBar
        backgroundColor={theme === "Light" ? "#f8fafc" : "#131313"}
        barStyle={theme === "Light" ? "dark-content" : "light-content"}
      />
    </Box>
  );
}
