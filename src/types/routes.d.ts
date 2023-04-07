import {
  NativeStackNavigationProp,
  NativeStackHeaderProps,
} from "@react-navigation/native-stack";

import { MaterialTopTabNavigationProp } from "@react-navigation/material-top-tabs";

export type propsNavigationStack = {
  Home: undefined;
  SelectCity: undefined;
  DetailForecast: undefined;
  Settings: undefined;
};

export type propStack = NativeStackNavigationProp<propsNavigationStack>;
export type propHeader = NativeStackHeaderProps<propsNavigationStack>;

export type propsNavigationTop = {
  Detail: undefined;
  Forecast: undefined;
};

export type propTop = MaterialTopTabNavigationProp<propsNavigationTop>;
