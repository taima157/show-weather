export interface GeoCity {
  title: string;
  id: string;
  resultType: string;
  administrativeAreaType: string;
  address: {
    label: string;
    countryCode: string;
    countryName: string;
    state: string;
    city: string;
  };
  position: {
    lat: number;
    lng: number;
  };
  mapView: {
    west: number;
    south: number;
    east: number;
    north: number;
  };
  scoring: {
    queryScore: number;
    fieldScore: {
      country: number;
      state: number;
    };
  };
}
