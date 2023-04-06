import {
  NativeStackNavigationProp,
  NativeStackHeaderProps,
} from "@react-navigation/native-stack";

export type propsNavigationStack = {
  Home: undefined;
  SelectCity: undefined;
  DetailForecast: undefined
};

export type propStack = NativeStackNavigationProp<propsNavigationStack>;
export type propHeader = NativeStackHeaderProps<propsNavigationStack>;
