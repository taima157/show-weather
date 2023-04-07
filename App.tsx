import { SafeAreaView, useColorScheme } from "react-native";
import { StackRoutes } from "./src/routes/stack";
import { NativeBaseProvider, extendTheme } from "native-base";
import {
  useFonts,
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_600SemiBold,
  Poppins_700Bold,
} from "@expo-google-fonts/poppins";
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Settings } from "./src/types/settings";

export default function App() {
  const [intialTheme, setInitialTheme] = useState<string | null>(null);
  const deviceTheme = useColorScheme();

  async function setSettings() {
    try {
      const localSettings = await AsyncStorage.getItem("settings");

      if (localSettings === null) {
        const settings: Settings = {
          aparence: [
            {
              mode: "light",
              selected: false,
            },
            {
              mode: "dark",
              selected: false,
            },
            {
              mode: "device",
              selected: true,
            },
          ],
        };

        await AsyncStorage.setItem("settings", JSON.stringify(settings));
      }
    } catch (error) {
      console.log(error);
    }
  }

  async function setTheme() {
    try {
      const localSettings = await AsyncStorage.getItem("settings");

      if (localSettings !== null) {
        const settings: Settings = JSON.parse(localSettings);

        settings.aparence.map((mode) => {
          if (mode.selected) {
            if (mode.mode === "device") {
              setInitialTheme(String(deviceTheme));

              return;
            }

            setInitialTheme(mode.mode);
          }
        });
      } else {
        setInitialTheme(String(deviceTheme));
      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    setSettings();
    setTheme();
  }, []);

  let [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_600SemiBold,
    Poppins_700Bold,
  });

  if (!fontsLoaded) {
    return null;
  }

  if (intialTheme === null) return;

  const config = {
    useSystemColorMode: false,
    initialColorMode: intialTheme,
  };

  const customTheme = extendTheme({ config });

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: "#000",
      }}
    >
      <NativeBaseProvider theme={customTheme}>
        <StackRoutes />
      </NativeBaseProvider>
    </SafeAreaView>
  );
}
