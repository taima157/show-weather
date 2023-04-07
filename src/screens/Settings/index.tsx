import {
  Ionicons,
  MaterialCommunityIcons,
  MaterialIcons,
} from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import {
  Box,
  Button,
  Icon,
  Link,
  Text,
  useColorMode,
  useColorModeValue,
} from "native-base";
import { propStack } from "../../types/routes";
import { useEffect, useState } from "react";
import { Settings as TypeSettings } from "../../types/settings";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { TouchableOpacity, useColorScheme } from "react-native";
import * as Application from "expo-application";

type ModeType = {
  mode: string;
  selected: boolean;
};

export default function Settings() {
  const navigation = useNavigation<propStack>();
  const [settings, setSettings] = useState<TypeSettings | null>(null);
  const [refreshSettings, setRefreshSettings] = useState<boolean>(false);
  const deviceTheme = useColorScheme();
  const currentTheme = useColorModeValue("Light", "Dark");
  const { toggleColorMode } = useColorMode();

  async function handleToggleColorMode(mode: ModeType) {
    if (mode.selected) return;
    if (settings === null) return;

    const newSettings: ModeType[] = settings.aparence.map(
      (oldMode: ModeType) => {
        if (oldMode.mode === mode.mode) {
          oldMode.selected = true;
        } else {
          oldMode.selected = false;
        }
        return oldMode;
      }
    );

    await AsyncStorage.setItem(
      "settings",
      JSON.stringify({
        aparence: newSettings,
      })
    );

    setSettings(null);

    setRefreshSettings(!refreshSettings);

    if (mode.mode === "device") {
      if (deviceTheme === String(currentTheme).toLowerCase()) return;

      toggleColorMode();
      return;
    }

    if (mode.mode === String(currentTheme).toLowerCase()) return;
    toggleColorMode();
  }

  useEffect(() => {
    async function getSettings() {
      try {
        const localSettings = await AsyncStorage.getItem("settings");

        if (localSettings !== null) {
          const parseSettings = JSON.parse(localSettings);

          setSettings(parseSettings);
        }
      } catch (error) {
        console.log(error);
      }
    }

    getSettings();
  }, [refreshSettings]);

  return (
    <Box flex={1} _dark={{ bgColor: "#0B0B0B" }} _light={{ bgColor: "#FFF" }}>
      <Box
        w="full"
        pt={6}
        px={5}
        pb={2}
        _dark={{ bgColor: "#131313" }}
        _light={{ bgColor: "#f8fafc" }}
      >
        <Button
          w="40%"
          p={0}
          justifyContent="flex-start"
          bgColor="transparent"
          onPress={() => navigation.goBack()}
          _pressed={{
            opacity: 0.5,
          }}
        >
          <Box w="full" display="flex" flexDirection="row" alignItems="center">
            <Icon as={Ionicons} name="chevron-back" size={8} />
            <Text fontFamily="Poppins_400Regular" fontSize={18}>
              Settings
            </Text>
          </Box>
        </Button>
      </Box>

      <Box flex={1} justifyContent="space-between">
        <Box p={5} mt={5}>
          <Box>
            <Text fontFamily="Poppins_500Medium" fontSize={16}>
              Aparence:
            </Text>
            {settings !== null && (
              <Box mt={4}>
                {settings.aparence.map((mode, index) => {
                  return (
                    <TouchableOpacity
                      key={index}
                      onPress={() => handleToggleColorMode(mode)}
                    >
                      <Box
                        w="full"
                        display="flex"
                        flexDirection="row"
                        justifyContent="space-between"
                        alignItems="center"
                        my={1}
                      >
                        <Text
                          fontFamily="Poppins_400Regular"
                          fontSize={16}
                          textTransform="capitalize"
                        >
                          {mode.mode}
                        </Text>
                        {mode.selected ? (
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
                    </TouchableOpacity>
                  );
                })}
              </Box>
            )}
          </Box>
        </Box>

        <Box
          px={5}
          py={3}
          _dark={{ bgColor: "#131313" }}
          _light={{ bgColor: "#f8fafc" }}
          w="full"
          alignItems="center"
          justifyContent="space-between"
          display="flex"
          flexDirection="row"
        >
          <Box>
            <Text fontFamily="Poppins_400Regular">Created by Taima</Text>
            <Text fontFamily="Poppins_400Regular" pt={2}>
              Version: {Application.nativeApplicationVersion}
            </Text>
          </Box>
          <Link href="https://github.com/taima157/show-weather">
            <Icon as={MaterialCommunityIcons} name="github" size={9} />
          </Link>
        </Box>
      </Box>
    </Box>
  );
}
