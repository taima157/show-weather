import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import Header from "../components/Header";
import Home from "../screens/Home";
import SelectCity from "../screens/SelectCity";
import TopRoutes from "./top";
import { propsNavigationStack } from "../types/routes";
import { WeatherProvider } from "../context/weather";
import Settings from "../screens/Settings";

const { Screen, Navigator } =
  createNativeStackNavigator<propsNavigationStack>();

export function StackRoutes() {
  return (
    <NavigationContainer>
      <WeatherProvider>
        <Navigator
          screenOptions={{
            header: (props) => <Header {...props} />,
          }}
        >
          <Screen name="Home" component={Home} />
          <Screen name="SelectCity" component={SelectCity} />
          <Screen name="DetailForecast" component={TopRoutes} />
          <Screen name="Settings" component={Settings} />
        </Navigator>
      </WeatherProvider>
    </NavigationContainer>
  );
}
