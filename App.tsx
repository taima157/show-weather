import { StyleSheet, Text, View, SafeAreaView } from "react-native";
import { WeatherProvider } from "./src/context/weather";
import { StackRoutes } from "./src/routes/stack";
import {
  NativeBaseProvider,
  extendTheme,
  StatusBar,
  useColorModeValue,
} from "native-base";
import {
  useFonts,
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_600SemiBold,
  Poppins_700Bold,
} from "@expo-google-fonts/poppins";

export default function App() {
  const text = useColorModeValue("Light", "Dark");

  let [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_600SemiBold,
    Poppins_700Bold,
  });

  if (!fontsLoaded) {
    return null;
  }

  const config = {
    useSystemColorMode: false,
    initialColorMode: "dark",
  };

  const customTheme = extendTheme({ config });

  console.log(text);

  return (
    <SafeAreaView style={styles.container}>
      <NativeBaseProvider theme={customTheme}>
        <StackRoutes />
      </NativeBaseProvider>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF",
  },
});
