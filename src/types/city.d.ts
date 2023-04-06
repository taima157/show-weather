import { GeoProps } from "./weather";

export interface City {
  name: string;
  location: GeoProps;
  selected: boolean;
}
