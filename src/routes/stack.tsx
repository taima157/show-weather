import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import Header from "../components/Header";
import Home from "../screens/Home";
import SelectCity from "../screens/SelectCity";
import { propsNavigationStack } from "../types/routes";

const { Screen, Navigator } =
  createNativeStackNavigator<propsNavigationStack>();

export function StackRoutes() {
  return (
    <NavigationContainer>
      <Navigator
        screenOptions={{
          header: (props) => <Header {...props} />,
        }}
      >
        <Screen name="Home" component={Home} />
        <Screen name="SelectCity" component={SelectCity} />
      </Navigator>
    </NavigationContainer>
  );
}