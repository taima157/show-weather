import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import Detail from "../screens/Detail";
import Forecast from "../screens/Forecast";
import { useColorModeValue } from "native-base";

const { Screen, Navigator } = createMaterialTopTabNavigator();

export default function TopRoutes() {
  const theme = useColorModeValue("Light", "Dark");

  return (
    <Navigator
      screenOptions={{
        tabBarActiveTintColor: theme === "Light" ? "#000" : "#FFF",
        tabBarInactiveTintColor: theme === "Light" ? "#909090" : "#A4A4A4",
        tabBarStyle: {
          backgroundColor: theme === "Light" ? "#FFF" : "#0B0B0B",
          elevation: 0,
          position: "relative",
        },
        tabBarLabelStyle: {
          fontFamily: "Poppins_600SemiBold",
          textTransform: "capitalize",
          fontSize: 16,
        },
        tabBarItemStyle: {
          padding: 0,
          margin: 0,
        },
        tabBarIndicatorContainerStyle: {
          width: "30%",
          marginTop: "6%",
          marginLeft: "15.5%",
          height: 2,
        },
        tabBarIndicatorStyle: {
          backgroundColor: theme === "Light" ? "#000" : "#FFF",
        },
        tabBarPressColor: "transparent",
      }}
    >
      <Screen name="Detail" component={Detail} />
      <Screen name="Forecast" component={Forecast} />
    </Navigator>
  );
}
